import { useState } from "react";
import { useStakedTokens } from "../hooks/useStakedTokens";
import StyledButton from "./StyledButton";
import TokenActionModal from "./TokenActionModal";
import type { Token } from "../utils/types";
import { aaveV3Withdraw } from "../services/aavev3Service";
import useStore from "../hooks/useStore";
import RefreshButton from "./RefreshButton";

const StakedWalletBalances = () => {
  const provider = useStore((state) => state.provider);
  const balances = useStakedTokens();
  const [hideZeroBalances, setHideZeroBalances] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  const toggleHideZeroBalances = () => {
    setHideZeroBalances(!hideZeroBalances);
  };

  if (balances.isLoading || !balances.data) {
    return <div>Loading...</div>;
  }

  const filteredBalances = balances.data.filter(
    (token) => !hideZeroBalances || Number(token.balance) > 0,
  );

  const selectedTokenBalance = balances.data?.find(
    (token) => token.address === selectedToken?.address,
  )?.balance;

  return (
    <div className="p-4 rounded-lg bg-container border border-container-border">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-white text-2xl font-bold">Staked Balances</p>
          <p className="text-slate-400 text-sm">
            This is a list of the tokens that you have staked in the Aave V3
            protocol.
          </p>
        </div>
        <RefreshButton
          onRefresh={() => balances.refetch()}
          isFetching={balances.isFetching}
          title="Refresh staked balances"
        />
      </div>

      <button
        title="Toggle hide zero balances"
        onClick={toggleHideZeroBalances}
        className="flex items-center gap-2 mt-2 cursor-pointer"
      >
        <input
          className="w-4 h-4"
          type="checkbox"
          readOnly
          checked={hideZeroBalances}
        />
        <label htmlFor="hideZeroBalances" className="text-sm">
          Hide zero balances
        </label>
      </button>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          {filteredBalances.length === 0 && (
            <div className="flex flex-col items-center py-10">
              <img
                src="https://i0.wp.com/criptotendencia.com/wp-content/uploads/2021/07/AAVE-se-vuelve-alcista-luego-de-un-importante-lanzamiento.jpg?fit=400%2C1000&ssl=1"
                alt="No staked balances"
                className="w-40 h-1/2 rounded-lg"
              />
              <p className="text-slate-200 text-lg text-center mt-4">
                No staked balances to show
              </p>
              <p className="text-slate-400 text-sm italic text-center">
                why don't you go and supply some?
              </p>
            </div>
          )}
          {filteredBalances.map((token) => (
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
                <p className="text-white text-lg font-bold">{token.name}</p>
              </div>
              <div className="flex flex-row items-end gap-2">
                <div className="flex flex-col items-end">
                  <p className="text-white text-sm">{token.balance}</p>
                  <p className="text-slate-400 text-sm">{token.symbol}</p>
                </div>
                <StyledButton
                  onClick={() => {
                    setSelectedToken(token);
                    setIsModalOpen(true);
                  }}
                  disabled={Number(token.balance) === 0}
                  title={
                    Number(token.balance) === 0
                      ? "No balance to withdraw"
                      : "Withdraw"
                  }
                >
                  Withdraw
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
        action="withdraw"
        onConfirm={async (amount, token) => {
          if (provider) {
            return aaveV3Withdraw(token, amount, provider);
          }
        }}
        balance={selectedTokenBalance || "0"}
      />
    </div>
  );
};

export default StakedWalletBalances;
