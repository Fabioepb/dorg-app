import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";
import { AAVE_V3_DATA_PROVIDER_ABI } from "../utils/contracts/aavev3/abi";
import { AAVE_V3_DATA_PROVIDER_CONTRACT_ADDRESS } from "../utils/contracts/aavev3/contract";
import useStore from "./useStore";
import type { Token } from "../utils/types";

interface SupplyCapInfo {
  hasCap: boolean;
  supplyCap: bigint;
  totalAToken: bigint;
  isCapped: boolean;
}

export const useSupplyCaps = (tokens: Token[]) => {
  const provider = useStore((state) => state.provider);

  return useQuery({
    queryKey: ["supplyCaps", tokens.map((t) => t.address)],
    queryFn: async (): Promise<Record<string, SupplyCapInfo>> => {
      if (!provider) {
        throw new Error("Provider not available");
      }

      const dataProvider = new ethers.Contract(
        AAVE_V3_DATA_PROVIDER_CONTRACT_ADDRESS,
        AAVE_V3_DATA_PROVIDER_ABI,
        provider,
      );

      const results: Record<string, SupplyCapInfo> = {};

      // Process tokens in parallel
      await Promise.all(
        tokens.map(async (token) => {
          try {
            // get token supply cap
            const [_borrowCap, supplyCap] = await dataProvider.getReserveCaps(
              token.address,
            );

            // get current reserve data
            const reserveData = await dataProvider.getReserveData(
              token.address,
            );
            const totalAToken = reserveData[2]; // totalAToken is at index 2

            const hasCap = supplyCap > 0n;
            const isCapped = hasCap && totalAToken >= supplyCap;

            results[token.address] = {
              hasCap,
              supplyCap,
              totalAToken,
              isCapped,
            };
          } catch (error) {
            console.error(
              `Error fetching supply cap for ${token.symbol}:`,
              error,
            );
            // Default to no cap if there's an error
            results[token.address] = {
              hasCap: false,
              supplyCap: 0n,
              totalAToken: 0n,
              isCapped: false,
            };
          }
        }),
      );

      return results;
    },
    enabled: !!provider && tokens.length > 0,
    staleTime: 30000, // 30 seconds
  });
};
