# Aave V3 DeFi dApp

A modern, full-featured decentralized application (dApp) for interacting with the Aave V3 lending protocol on the Ethereum Sepolia testnet. This application provides a complete DeFi experience with wallet integration, real-time balance tracking, and seamless token supply/withdrawal operations.

This project was built in a single day (8 hours of development time) as part of a take home interview test.

## 🚀 Features

### Core Functionality
- **Wallet Integration**: Seamless MetaMask connection with automatic chain switching
- **Token Supply**: Deposit ETH and ERC20 tokens (USDC, USDT, AAVE) into Aave V3
- **Token Withdrawal**: Withdraw supplied tokens with real-time balance updates
- **Real-time Balances**: Live tracking of wallet balances and staked token balances
- **Transaction History**: Complete transaction log with timestamps and status
- **Supply Caps Monitoring**: Real-time display of protocol supply limits

### User Experience
- **Responsive Design**: Modern UI built with Tailwind CSS that works on all devices
- **Toast Notifications**: Real-time feedback for all user actions
- **Loading States**: Smooth loading indicators for better UX
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Address Formatting**: Clean display of wallet addresses and balances

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Web3**: Ethers.js v6
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Notifications**: React Toastify
- **Date Handling**: Day.js

## 📋 Prerequisites

Before running this application, ensure you have:

1. **Node.js** (v18 or higher)
2. **MetaMask** browser extension installed
3. **Sepolia testnet ETH** for transactions
4. **Modern browser** with Web3 support

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd dorg-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
bun install
```

### 3. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── MetamaskButton.tsx      # Wallet connection
│   ├── WalletBalances.tsx      # Display wallet balances
│   ├── WalletStakedBalances.tsx # Display staked balances
│   ├── RecentTransactions.tsx  # Transaction history
│   ├── TokenActionModal.tsx    # Supply/withdraw modal
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useStore.ts            # Zustand store
│   ├── useTokenBalances.ts    # Token balance fetching
│   ├── useStakedTokens.ts     # Staked token data
│   └── ...
├── services/           # Business logic services
│   ├── aavev3Service.ts       # Aave V3 interactions
│   ├── balanceService.ts      # Balance calculations
│   └── transactionService.ts  # Transaction handling
├── utils/              # Utility functions and constants
│   ├── constants.ts           # App constants
│   ├── types.ts              # TypeScript types
│   ├── contracts/            # Contract ABIs and addresses
│   └── queryClient.tsx       # React Query configuration
└── App.tsx             # Main application component
```

## 🔧 Configuration

### Contract Addresses

All contract addresses are configured for the Sepolia testnet:

- **Aave V3 Pool**: `0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951`
- **Aave V3 ETH Pool**: `0x387d311e47e80b498169e6fb51d3193167d89F7D`
- **Data Provider**: `0x3e9708d80f7B3e43118013075F7e95CE3AB31F31`

### Environment Variables

The only environment variable needed to run this project locally is

- VITE_ETHERSCAN_API_KEY

Which should be supplied in a standard `.env` file with an API key from etherscan.

## 📱 Usage Guide

### Supplying Tokens

1. **Select Token**: Choose the token you want to supply
2. **Enter Amount**: Input the amount you want to deposit
3. **Review**: Check the transaction details
4. **Confirm**: Approve the transaction in MetaMask
5. **Wait**: Monitor the transaction status

### Withdrawing Tokens

1. **Select Token**: Choose the staked token you want to withdraw
2. **Enter Amount**: Input the amount you want to withdraw
3. **Review**: Check the transaction details
4. **Confirm**: Approve the transaction in MetaMask
5. **Wait**: Monitor the transaction status

## 🔍 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

**Note**: This is a testnet application. Never use real funds or mainnet addresses with this dApp.
