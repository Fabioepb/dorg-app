import React, { useState } from "react";
import Modal from "react-modal";
import { X } from "lucide-react";
import type { Token } from "../utils/types";
import StyledButton from "./StyledButton";

interface TokenActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: Token | null;
  action: "supply" | "withdraw";
  onConfirm: (amount: string, token: Token) => any;
  balance: string;
}

const TokenActionModal: React.FC<TokenActionModalProps> = ({
  isOpen,
  onClose,
  token,
  action,
  onConfirm,
  balance,
}) => {
  const [amount, setAmount] = useState("");

  const handleConfirm = async () => {
    if (amount && token) {
      onConfirm(amount, token);
    }
  };

  const handleClose = () => {
    setAmount("");
    onClose();
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = parseFloat(value);

    if (parsedValue > parseFloat(balance)) {
      setAmount(balance);
      return;
    }

    setAmount(value);
  };

  if (!token) return null;

  const actionTitle = action === "supply" ? "Supply" : "Withdraw";
  const actionDescription =
    action === "supply"
      ? `Supply ${token.symbol} to Aave V3 and earn interest`
      : `Withdraw ${token.symbol} from Aave V3`;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      shouldReturnFocusAfterClose
      preventScroll
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      overlayClassName="fixed inset-0 bg-black/50 z-40"
      contentLabel={`${actionTitle} ${token.symbol} Modal`}
    >
      <div className="bg-[#121229] border border-[#535353] rounded-lg p-6 w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-white text-xl font-bold">
            {actionTitle} {token.symbol}
          </h2>
          <button
            title="Close"
            onClick={handleClose}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm mb-5">{actionDescription}</p>

        {/* Amount Input */}
        <div className="mb-6">
          <label
            htmlFor="amount"
            className="block text-white text-sm font-medium mb-2"
          >
            Amount ({token.symbol})
          </label>
          <div className="relative">
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="0.00"
              min={0}
              maxLength={16}
              className="w-full px-4 py-3 pr-12 bg-accent border border-[#535353] rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent z-0"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-row items-center gap-2 z-10 bg-accent py-3">
              <p className="text-slate-400 text-sm">{token.symbol}</p>
              <img
                src={token.logo_src}
                alt={token.symbol}
                className="w-5 h-5"
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between px-1">
            <div className="flex flex-row items-center gap-2">
              <p className="text-slate-400 text-sm mt-1">Balance:</p>
              <p className="text-slate-400 text-sm mt-1">
                {balance} {token.symbol}
              </p>
            </div>
            <button
              onClick={() => setAmount(balance)}
              className="text-slate-400 text-sm mt-1 hover:text-white transition-colors cursor-pointer"
            >
              Max
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <StyledButton
            onClick={handleClose}
            danger
            className="flex-1 bg-transparent border border-accent text-white hover:bg-accent"
          >
            Cancel
          </StyledButton>
          <StyledButton
            onClick={handleConfirm}
            disabled={
              !amount ||
              parseFloat(amount) <= 0 ||
              parseFloat(amount) > parseFloat(balance)
            }
            className="flex-1"
          >
            {actionTitle}
          </StyledButton>
        </div>
      </div>
    </Modal>
  );
};

export default TokenActionModal;
