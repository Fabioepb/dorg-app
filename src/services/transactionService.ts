import { SEPOLIA_CHAIN_ID } from "../utils/constants";
import type { EtherscanTransaction } from "../utils/types";

interface EtherscanResponse {
  result: EtherscanTransaction[];
  message: string;
  status: string;
}

export const getUserTransactions = async (
  address: string,
): Promise<EtherscanTransaction[]> => {
  try {
    // THIS IS ABAD PRACTICE, I WOULD NOT DO THIS IN PRODUCTION
    // THIS EXPOSES THE API KEY TO THE CLIENT WHICH IS NOT SECURE
    // TODO: Use a proxy server to hide the api key
    const transactions = await fetch(
      `https://api.etherscan.io/v2/api?chainid=${SEPOLIA_CHAIN_ID}&module=account&action=txlist&address=${address}&tag=latest&apikey=${import.meta.env.VITE_ETHERSCAN_API_KEY}&sort=desc`,
    );
    const data = await transactions.json() as EtherscanResponse;
    return data.result;
  } catch (error) {
    console.log(error);
    return []
  }
};
