import NavigationBar from "./components/NavigationBar";
import WarningBanner from "./components/WarningBanner";
import useStore from "./hooks/useStore";
import MissingConnectionBanner from "./components/MissingConnectionBanner";
import WalletBalances from "./components/WalletBalances";
import StakedWalletBalances from "./components/WalletStakedBalances";
import { BookOpen } from "lucide-react";
import AssetInformationBanner from "./components/AssetInformationBanner";
import RecentTransactions from "./components/RecentTransactions";

function App() {
  const { address } = useStore();

  return (
    <>
      <NavigationBar />
      <div className="min-h-[calc(100vh-57px)] w-full bg-[#020617] relative">
        <div className="absolute inset-0 z-0 content" />
        <div className="container mx-auto relative">
          <div className="flex flex-col items-center justify-center h-full py-5 mx-2">
            <WarningBanner className="max-w-xl">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-8 h-8" />
                <h1 className="text-xl font-bold">
                  This dApp runs on the Sepolia Testnet
                </h1>
              </div>
              <p>
                Any and all transactions and assets here are on the Ethereum
                Sepolia Testnet, and are not real transactions, thus no real
                value is at stake.
              </p>
            </WarningBanner>

            {address ? (
              <div className="flex flex-col md:flex-row justify-center h-full py-10 gap-4">
                <div className="flex flex-col gap-4">
                  <StakedWalletBalances />
                  <WalletBalances />
                </div>
                <div className="flex flex-col gap-4">
                  <RecentTransactions />
                  <AssetInformationBanner />
                </div>
              </div>
            ) : (
              <MissingConnectionBanner />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
