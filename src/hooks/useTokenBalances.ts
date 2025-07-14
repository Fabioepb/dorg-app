import { useQuery } from "@tanstack/react-query";
import useStore from "./useStore";
import { getAllTrackedTokenBalances } from "../services/balanceService";

// Lifted the query logic to a custom hook to make it easier to use in other components
export const useTokenBalances = () => {
  const { address, provider } = useStore();

  return useQuery({
    queryKey: ["balances", address, provider],
    queryFn: async () => {
      const balances = await getAllTrackedTokenBalances(address, provider!);
      return balances;
    },
    enabled: !!address && !!provider,
  });
}; 