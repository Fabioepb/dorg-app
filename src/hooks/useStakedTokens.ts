import { useQuery } from "@tanstack/react-query";
import useStore from "./useStore";
import { getStakedTokenBalances } from "../services/balanceService";

// Separated from the useTokenBalances in case we want to add more functionality to staked tokens later i.e: use the staked tokens to borrow against
export const useStakedTokens = () => {
  const { address, provider } = useStore();

  return useQuery({
    queryKey: ["staked-tokens-balances", address, provider],
    queryFn: async () => {
      const balances = await getStakedTokenBalances(address, provider!);
      return balances;
    },
    enabled: !!address && !!provider,
  });
}; 