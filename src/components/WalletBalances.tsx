import { useState } from "react";
import { useTokenBalances } from "../hooks/useTokenBalances";
import { useSupplyCaps } from "../hooks/useSupplyCaps";
import StyledButton from "./StyledButton";
import TokenActionModal from "./TokenActionModal";
import type { Token } from "../utils/types";
import { aaveV3Supply } from "../services/aavev3Service";
import useStore from "../hooks/useStore";
import RefreshButton from "./RefreshButton";

const WalletBalances = () => {
  const provider = useStore((state) => state.provider);
  const balances = useTokenBalances();
  const supplyCaps = useSupplyCaps(balances.data || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  const handleSelectToken = (token: Token) => {
    setSelectedToken(token);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 rounded-lg bg-container border border-container-border">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-white text-2xl font-bold">Wallet Balances</p>
          <p className="text-slate-400 text-sm">
            This is a list of [some] the tokens that you can supply to the Aave
            V3 protocol and earn interest.
          </p>
        </div>
        <RefreshButton
          onRefresh={() => balances.refetch()}
          isFetching={balances.isFetching}
          title="Refresh balances"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          {balances.data?.map((token) => (
            <div
              key={token.address}
              className="flex flex-row gap-2 py-3 items-center justify-between border-b border-container-border"
            >
              <div className="flex gap-3 items-center">
                <img
                  src={token.logo_src}
                  alt={token.name}
                  className="w-6 h-6"
                />
                <div className="flex flex-col">
                  <p className="text-white text-lg font-bold">{token.name}</p>
                  {supplyCaps.data?.[token.address]?.isCapped && (
                    <p className="text-red-400 text-xs">Supply cap reached</p>
                  )}
                </div>
              </div>
              <div className="flex flex-row items-end gap-2">
                <div className="flex flex-col items-end">
                  <p className="text-white text-sm">{token.balance}</p>
                  <p className="text-slate-400 text-sm">{token.symbol}</p>
                </div>
                <StyledButton
                  onClick={() => handleSelectToken(token)}
                  disabled={
                    Number(token.balance) === 0 ||
                    supplyCaps.data?.[token.address]?.isCapped
                  }
                  title={
                    Number(token.balance) === 0
                      ? "No balance to supply"
                      : supplyCaps.data?.[token.address]?.isCapped
                        ? "Supply cap reached"
                        : "Supply to Aave V3"
                  }
                >
                  Supply
                </StyledButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TokenActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        token={selectedToken}
        action="supply"
        onConfirm={(amount, token) => {
          if (provider) {
            return aaveV3Supply(token, amount, provider);
          }
        }}
        balance={
          balances.data?.find((t) => t.address === selectedToken?.address)
            ?.balance || "0"
        }
      />
    </div>
  );
};

export default WalletBalances
