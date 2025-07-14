import type { BrowserProvider } from "ethers";
import { formatUnits, Contract } from "ethers";
import ERC20_ABI from "../utils/contracts/genericAbi";
import { formatBalance, trackedLpTokens, trackedTokens } from "../utils/constants";
import type { Token } from "../utils/types";

// Gets the balance of a token for a given address, if the address is the zero address, it will use the getBalance function
export const getTokenBalance = async (address: string, tokenAddress: string, provider: BrowserProvider): Promise<bigint> => {
  if(tokenAddress === "0x0000000000000000000000000000000000000000") {
    const balance = await provider.getBalance(address);
    return balance;
  }
  const contract = new Contract(tokenAddress, ERC20_ABI, provider);
  const balance = await contract.balanceOf(address) as bigint;
  return balance;
}

// Gets the balance of a list of tokens for a given address and formats them to a human readable number
const getBalancesFormatted = async (tokens: Token[],userAddress: string, provider: BrowserProvider) => {
  const balances = await Promise.all(tokens.map(async (token) => {
    const balance = await getTokenBalance(userAddress, token.address, provider);

    return { 
      ...token, 
      // format the balance to the token's decimals, making it a human readable number
      balance: formatBalance(formatUnits(balance.toString(), token.decimals)),
      balanceRaw: balance
     };
  }));
  return balances;
} 

// Gets the balance of all tracked tokens for a given address and formats them to a human readable number
export const getAllTrackedTokenBalances = async (userAddress: string, provider: BrowserProvider) => {
  const balances =  getBalancesFormatted(trackedTokens, userAddress, provider);
  return balances;
} 

// Gets the balance of all staked tokens for a given address and formats them to a human readable number
export const getStakedTokenBalances = async (userAddress: string, provider: BrowserProvider) => {
  const balances =  getBalancesFormatted(trackedLpTokens, userAddress, provider);
  return balances;
}