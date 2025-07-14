import { ethers } from "ethers";
import useStore from "../hooks/useStore";
import { formatAddress, SEPOLIA_CHAIN_ID } from "../utils/constants";
import { toast } from "react-toastify";
import type { Eip1193Provider } from "ethers";
import { LogOut } from "lucide-react";
import { useEffect } from "react";

// Extend Window interface to include ethereum to avoid type errors
declare global {
  interface Window {
    ethereum?: Eip1193Provider;
  }
}

const MetamaskButton = () => {
  // ideally this would all be handled by a 3rd party library like Wagmi.
  // it provides an out of the box solution with Hooks for better Developer experience
  const {
    setSigner,
    setProvider,
    setChainId,
    setAddress,
    address,
    provider,
    disconnectWallet,
  } = useStore();

  // Listen for Metamask disconnection events
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = async (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected their wallet
        disconnectWallet();
        toast.info("Wallet disconnected");
      } else if (accounts[0] !== address) {
        // safety check to ensure provider is still valid
        if (provider) {
          setAddress(accounts[0]);
          toast.info(`Account switched to ${formatAddress(accounts[0])}`);

          setSigner(await provider.getSigner());
          return;
        }

        // if provider is not valid, we need to try to reconnect
        handleConnect();
      }
    };

    const handleChainChanged = (chainId: string) => {
      // Reload the page when chain changes (recommended by Metamask)
      if (Number(chainId) !== SEPOLIA_CHAIN_ID) {
        window.location.reload();
      }
    };

    const handleDisconnect = () => {
      disconnectWallet();
      if (address) {
        toast.info("Wallet disconnected");
      }
    };

    // Add event listeners
    (window.ethereum as any).on("accountsChanged", handleAccountsChanged);
    (window.ethereum as any).on("chainChanged", handleChainChanged);
    (window.ethereum as any).on("disconnect", handleDisconnect);

    // Cleanup event listeners
    return () => {
      if (window.ethereum) {
        (window.ethereum as any).removeListener(
          "accountsChanged",
          handleAccountsChanged,
        );
        (window.ethereum as any).removeListener(
          "chainChanged",
          handleChainChanged,
        );
        (window.ethereum as any).removeListener("disconnect", handleDisconnect);
      }
    };
  }, [address, setAddress]);

  const handleConnect = async () => {
    if (!window.ethereum) {
      // We'll assume metamask is the only option
      // with other libraries to help make this more flexible, we could check for other options such as, Coinbase wallet, etc.
      // Ideally we could use something like WalletConnect
      toast.error("Metamask is not installed");
      return;
    }

    const provider = new ethers.BrowserProvider(
      window.ethereum,
      SEPOLIA_CHAIN_ID,
    );
    try {
      const signer = await provider.getSigner();

      //force the user to switch to the correct chain
      await provider.send("wallet_switchEthereumChain", [
        { chainId: `0x${SEPOLIA_CHAIN_ID.toString(16)}` },
      ]);

      setSigner(signer);
      setProvider(provider);
      setChainId(SEPOLIA_CHAIN_ID);
      setAddress(await signer.getAddress());
    } catch (error) {
      toast.error("Error connecting to Metamask");
      console.error(error);
      disconnectWallet();
      return;
    }

    toast.success("Connected to Metamask");
  };

  const handleDisconnect = () => {
    disconnectWallet();
  };

  if (!address) {
    return (
      <button
        className="border border-accent drop-shadow-accent drop-shadow-md mouse-pointer rounded-lg py-1 px-3 cursor-pointer min-h-[40px]"
        onClick={handleConnect}
      >
        Connect
      </button>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard");
  };

  return (
    <>
      <div
        className="flex items-center gap-2 border border-accent drop-shadow-accent drop-shadow-md mouse-pointer rounded-lg py-1 px-3 cursor-pointer hover:bg-accent/10 transition-colors min-h-[40px] min-w-fit"
        title="Copy Address"
      >
        <img
          src="/metamask.svg"
          alt="Metamask"
          width={30}
          height={30}
          // className="w-4 h-4"
        />
        <p onClick={handleCopy}>{formatAddress(address)}</p>
        <button
          className="hover:text-red-500 transition-colors cursor-pointer"
          title="Disconnect"
          onClick={handleDisconnect}
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
      <div
        title="Ethereum Sepolia Testnet"
        className="rounded-lg bg-background border border-accent p-1 h-[40px] w-[40px] flex items-center justify-center"
      >
        <img
          className="fill-white"
          src="https://cdn.iconscout.com/icon/free/png-512/free-ethereum-icon-download-in-svg-png-gif-file-formats--crypto-cryptocurrency-digital-money-coins-pack-science-technology-icons-5524525.png?f=webp&w=32"
          width={24}
          height={24}
        />
      </div>
    </>
  );
};

export default MetamaskButton;
