import { useQuery } from "@tanstack/react-query";
import useStore from "./useStore";
import { getUserTransactions } from "../services/transactionService";
import type { EtherscanTransaction } from "../utils/types";

export const useUserTransactions = () => {
  const { address } = useStore();

  return useQuery<EtherscanTransaction[]>({
    queryKey: ["userTransactions", address],
    queryFn: async () => {
      const transactions = await getUserTransactions(address);
      return transactions;
    },
    enabled: !!address,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });
}; 