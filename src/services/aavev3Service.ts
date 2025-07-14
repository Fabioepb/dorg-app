import {
  type BrowserProvider,
  Contract,
  ethers,
  TransactionResponse,
} from "ethers";
import type { Token } from "../utils/types";
import {
  AAVE_V3_SUPPLY_ETH_ABI,
  AAVE_V3_POOL_ABI,
  ERC20_PERMIT_ABI,
} from "../utils/contracts/aavev3/abi";
import {
  AAVE_V3_ETH_POOL_CONTRACT_ADDRESS,
  AAVE_V3_SUPPLY_TOKEN_CONTRACT_ADDRESS,
  AAV3_V3_POOL_ADDRESS,
} from "../utils/contracts/aavev3/contract";
import { toast } from "react-toastify";
import { queryClient } from "../utils/queryClient";
import {
  ADDRESS_ZERO,
  AETHWETH_ADDRESS,
  SEPOLIA_CHAIN_ID,
} from "../utils/constants";

const handleTransactionError = (error: Error) => {
  if (error instanceof Error && error.message.includes("insufficient funds")) {
    toast.error("Insufficient funds");
    return;
  }

  if (error instanceof Error && error.message.includes("rejected")) {
    toast.error("User rejected the request");
    return;
  }

  toast.error(`Error creating transaction: ${error.message}`);
  console.log(error);
};

// Helper function to invalidate balance queries and show success toast
const handleTransactionSuccess = (action: string, tokenSymbol: string) => {
  queryClient.invalidateQueries({ queryKey: ["balances"] });
  queryClient.invalidateQueries({ queryKey: ["staked-tokens-balances"] });
  queryClient.invalidateQueries({ queryKey: ["userTransactions"] });

  // Show success toast
  toast.success(`Successfully ${action} ${tokenSymbol}.`);
};

const handleSendTransaction = async (
  tx: TransactionResponse,
  token: Token,
  action: string,
) => {
  const txPromise = tx.wait();
  toast.promise(txPromise, {
    pending: "Sending transaction...",
    error: "Transaction failed",
  });
  txPromise.then(() => {
    handleTransactionSuccess(action, token.symbol);
  });
  return txPromise;
};
export const aaveV3Withdraw = async (
  token: Token,
  amount: string,
  provider: BrowserProvider,
) => {
  const action = "withdrawn";
  const signer = await provider.getSigner();
  const walletAddress = await signer.getAddress();
  // withdraw Sepolia ETH
  if (token.address === AETHWETH_ADDRESS) {
    const contract = new Contract(
      AAVE_V3_ETH_POOL_CONTRACT_ADDRESS,
      AAVE_V3_SUPPLY_ETH_ABI,
      signer,
    );
    try {
      const amountInWei = ethers.parseEther(amount);
      const tx = await contract.withdrawETH(
        AAV3_V3_POOL_ADDRESS,
        amountInWei,
        walletAddress,
      );
      return handleSendTransaction(tx, token, action);
    } catch (error: unknown) {
      if (error instanceof Error) {
        handleTransactionError(error);
        return;
      }
      console.log("Unknown error", error);
      return null;
    }
  }

  const amountInWei = ethers.parseUnits(amount, token.decimals);
  const contract = new Contract(AAV3_V3_POOL_ADDRESS, AAVE_V3_POOL_ABI, signer);
  const wrapperContract = new Contract(token.address, ERC20_PERMIT_ABI, signer);

  try {
    // get the underlying asset address that the wrapped token is backed by
    const underlyingAssetAddress =
      await wrapperContract.UNDERLYING_ASSET_ADDRESS();

    const tx = await contract.withdraw(
      underlyingAssetAddress,
      amountInWei,
      walletAddress,
    );
    return handleSendTransaction(tx, token, action);
  } catch (error: unknown) {
    if (error instanceof Error) {
      handleTransactionError(error);
      return;
    }
    console.log("Unknown error", error);
    return null;
  }
};

export const aaveV3Supply = async (
  token: Token,
  amount: string,
  provider: BrowserProvider,
) => {
  const action = "supplied";
  const signer = await provider.getSigner();
  const walletAddress = await signer.getAddress();

  if (token.address === ADDRESS_ZERO) {
    // Create ETH supply contract instance
    const contract = new Contract(
      AAVE_V3_ETH_POOL_CONTRACT_ADDRESS,
      AAVE_V3_SUPPLY_ETH_ABI,
      signer,
    );

    try {
      // Convert amount to wei
      const amountInWei = ethers.parseEther(amount);

      console.log(`Depositing ${amount} ETH (${amountInWei} wei) to Aave V3`);

      const tx = await contract.depositETH(
        AAVE_V3_SUPPLY_TOKEN_CONTRACT_ADDRESS,
        walletAddress,
        0,
        { value: amountInWei },
      );

      return handleSendTransaction(tx, token, action);
    } catch (error: unknown) {
      if (error instanceof Error) {
        handleTransactionError(error);
        return;
      }
      console.log("Unknown error", error);
      return null;
    }
  }
  const amountInWei = ethers.parseUnits(amount, token.decimals);
  const tokenContract = new Contract(token.address, ERC20_PERMIT_ABI, signer);
  // aave v3 pool contract
  const poolContract = new Contract(
    AAV3_V3_POOL_ADDRESS,
    AAVE_V3_POOL_ABI,
    signer,
  );

  try {
    const nonce = await tokenContract.nonces(walletAddress);

    // 10 minutes from now
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10;

    // Sign the permit data
    const signature = await signer.signTypedData(
      {
        name: await tokenContract.name(),
        version: "1",
        chainId: SEPOLIA_CHAIN_ID,
        verifyingContract: token.address,
      },
      {
        Permit: [
          { name: "owner", type: "address" },
          { name: "spender", type: "address" },
          { name: "value", type: "uint256" },
          { name: "nonce", type: "uint256" },
          { name: "deadline", type: "uint256" },
        ],
      },
      {
        owner: walletAddress,
        spender: AAV3_V3_POOL_ADDRESS,
        value: amountInWei,
        nonce: nonce,
        deadline: deadline,
      },
    );

    // Split the signature into v, r, s
    const sig = ethers.Signature.from(signature);
    // Call supplyWithPermit on the Aave V3 Pool contract
    const tx = await poolContract.supplyWithPermit(
      token.address,
      amountInWei,
      walletAddress,
      0, // referralCode is disabled on aave v3 for now so we pass 0
      deadline,
      sig.v,
      sig.r,
      sig.s,
    );

    console.log(`Transaction hash: ${tx.hash}`);
    return handleSendTransaction(tx, token, action);
  } catch (error: unknown) {
    if (error instanceof Error) {
      handleTransactionError(error);
      return;
    }
    console.log("Unknown error", error);
    return null;
  }
};
