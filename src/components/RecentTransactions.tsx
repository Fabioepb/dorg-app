import { CircleCheckBig, CircleX, ExternalLink, Power } from "lucide-react";
import useStore from "../hooks/useStore";
import { useUserTransactions } from "../hooks/useUserTransactions";
import RefreshButton from "./RefreshButton";
import {
  formatAddress,
  formatFunctionName,
  formatRelativeTime,
} from "../utils/constants";

const RecentTransactions = () => {
  const address = useStore((state) => state.address);
  const { data: transactions, refetch, isFetching } = useUserTransactions();

  if (!transactions || transactions.length === 0) {
    return (
      <div className="p-4 rounded-lg bg-container border border-container-border">
        <p className="text-white text-2xl font-bold">Recent Transactions</p>
        <p className="text-slate-400 text-sm">No transactions found</p>
      </div>
    );
  }

  // only show the last 5 transactions
  const slicedTransactions = transactions?.slice(0, 5);
  return (
    <div className="p-4 rounded-lg bg-container border border-container-border">
      <div className="flex flex-col md:flex-row items-start mb-4">
        <div className="w-full">
          <div className="flex flex-row justify-between items-center">
            <p className="text-white text-2xl font-bold">Recent Transactions</p>
            <div className="flex gap-2">
              <RefreshButton
                onRefresh={() => refetch()}
                isFetching={isFetching}
                title="Refresh transactions"
              />
              <button
                title="View on Etherscan"
                onClick={() => {
                  window.open(
                    `https://sepolia.etherscan.io/address/${address}`,
                    "_blank",
                  );
                }}
                className="flex items-center gap-2 text-slate-400 hover:text-white hover:underline cursor-pointer"
              >
                <ExternalLink className="h-6 w-6" />
              </button>
            </div>
          </div>
          <p className="text-slate-400 text-sm">
            The most recent transactions that you have made.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {slicedTransactions.map((transaction) => (
          <div
            key={transaction.hash}
            className="flex flex-row justify-between gap-2 border-b border-container-border py-2 cursor-pointer"
            title={`View on Etherscan: ${transaction.hash}`}
            onClick={() => {
              window.open(
                `https://sepolia.etherscan.io/tx/${transaction.hash}`,
                "_blank",
              );
            }}
          >
            <div className="flex flex-row items-center gap-2">
              <div>
                {transaction.isError === "1" ? (
                  <CircleX className="h-6 w-6 text-red-500" />
                ) : (
                  <CircleCheckBig className="h-6 w-6 text-green-500" />
                )}
              </div>
              <div>
                <p>
                  {formatFunctionName(transaction.functionName || "Transfer")}
                </p>
                <p className="text-slate-400 text-sm">
                  {formatRelativeTime(transaction.timeStamp)}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-end">
              <button
                title="View on destination address on Etherscan"
                onClick={() => {
                  window.open(
                    `https://sepolia.etherscan.io/address/${transaction.to}`,
                    "_blank",
                  );
                }}
                className="text-slate-400 text-sm hover:underline cursor-pointer"
              >
                {formatAddress(transaction.to)}
              </button>
              <p className="text-slate-400 text-sm">
                {transaction.confirmations} Blocks of Confirmation
              </p>
            </div>
          </div>
        ))}
        <div className="flex flex-row justify-center items-center gap-2 mt-4">
          <Power className="h-6 w-6 text-slate-400" />
          <p className="text-slate-400 text-sm">
            Powered by{" "}
            <a
              href="https://sepolia.etherscan.io"
              className="text-blue-500 hover:text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Etherscan
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
