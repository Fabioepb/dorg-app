import { BookOpen } from "lucide-react";
import WarningBanner from "./WarningBanner";

const AssetInformationBanner = () => {
  return (
    <WarningBanner className="md:max-w-md">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-8 h-8" />
        <h1 className="text-xl font-bold">
          Need some Assets to interact with the dApp?
        </h1>
      </div>
      <p className="text-sm">
        You can get some Sepolia ETH to play with by using the
        <a
          href="https://cloud.google.com/application/web3/faucet/ethereum/sepolia"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 underline ml-1 font-bold"
        >
          Etherem Sepolia Faucet by Google Cloud
        </a>
        .
      </p>

      <p className="text-sm mt-3">
        After receiving some Sepolia ETH, you can use
        <a
          href="https://app.uniswap.org/swap"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 underline ml-1 font-bold mr-1"
        >
          Uniswap
        </a>
        to swap your Sepolia ETH for some of the other assets supported by this
        dApp <small>(USDC, USDT, AAVE)</small>. <br /><br />
        You can also use the
        <a
          href="https://app.aave.com/faucet/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 underline ml-1 font-bold mr-1"
        >
          Aave Faucet
        </a>
        to get the assets.
      </p>

      <p className="text-sm mt-3 italic text-slate-400">
        Make sure you've enabled testnet mode on the settings on Uniswap!
      </p>
    </WarningBanner>
  );
};

export default AssetInformationBanner;
