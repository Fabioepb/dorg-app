import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { Token } from "./types";
dayjs.extend(relativeTime);

export const SEPOLIA_CHAIN_ID = 11155111;

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatBalance = (balance: string): string => {
  const num = parseFloat(balance);

  // If the number is very small (< 0.0001), show up to 8 decimals
  if (num < 0.0001) {
    return num.toFixed(8);
  }

  // If the number is small (< 1), show up to 4 decimals
  if (num < 1) {
    return num.toFixed(4);
  }

  // If the number is medium (< 1000), show up to 3 decimals
  if (num < 1000) {
    return num.toFixed(3);
  }

  // For larger numbers, show only 2 decimals
  return num.toFixed(2);
};

export const formatRelativeTime = (timeStamp: string) => {
  return dayjs(parseInt(timeStamp) * 1000).fromNow();
};

export const formatFunctionName = (functionName: string) => {
  if (functionName === "Transfer") {
    return "Transfer";
  }

  return functionName
    .split("(")[0]
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const trackedTokens: Token[] = [
  {
    address: "0x0000000000000000000000000000000000000000",
    name: "Sepolia ETH",
    symbol: "ETH",
    decimals: 18,
    logo_src: "https://cdn-icons-png.flaticon.com/512/14446/14446159.png",
  },
  {
    address: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
    name: "USDC",
    symbol: "USDC",
    decimals: 6,
    logo_src: "https://cdn-icons-png.flaticon.com/512/14446/14446285.png",
  },
  {
    address: "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0",
    name: "USDT",
    symbol: "USDT",
    decimals: 6,
    logo_src: "https://cdn-icons-png.flaticon.com/512/14446/14446253.png",
  },
  {
    address: "0x88541670E55cC00bEEFD87eB59EDd1b7C511AC9a",
    name: "AAVE",
    symbol: "AAVE",
    decimals: 18,
    logo_src: "https://cdn-icons-png.flaticon.com/512/15208/15208113.png",
  },
];

export const trackedLpTokens: Token[] = [
  {
    address: "0x6b8558764d3b7572136F17174Cb9aB1DDc7E1259",
    name: "Supplied AAVE",
    symbol: "aEthAAVE",
    decimals: 18,
    logo_src: "https://app.aave.com/icons/tokens/aave.svg",
  },
  {
    address: "0xAF0F6e8b0Dc5c913bbF4d14c22B4E78Dd14310B6",
    name: "Supplied USDT",
    symbol: "aEthUSDT",
    decimals: 6,
    logo_src: "https://app.aave.com/icons/tokens/usdt.svg",
  },
  {
    address: "0x16dA4541aD1807f4443d92D26044C1147406EB80",
    name: "Supplied USDC",
    symbol: "aEthUSDC",
    decimals: 6,
    logo_src: "https://app.aave.com/icons/tokens/usdc.svg",
  },
  {
    address: "0x5b071b590a59395fe4025a0ccc1fcc931aac1830",
    name: "Supplied ETH",
    symbol: "aEthWETH",
    decimals: 18,
    logo_src: "https://app.aave.com/icons/tokens/weth.svg",
  },
];

export const AETHWETH_ADDRESS = "0x5b071b590a59395fe4025a0ccc1fcc931aac1830";
