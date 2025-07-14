import type { BrowserProvider, Signer } from "ethers";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { SEPOLIA_CHAIN_ID } from "../utils/constants";

// Actions
// actions are functions that can be used to update the state
interface Actions {
  setSigner: (signer: Signer | null) => void;
  setProvider: (provider: BrowserProvider | null) => void;
  setChainId: (chainId: any) => void;
  setAddress: (address: any) => void;
  disconnectWallet: () => void;
}

// State
// state is the data that the store manages
interface State {
  signer: Signer | null;
  provider: BrowserProvider | null;
  chainId: number;
  address: string;
}

// Initial State
// initial state is the data that the store starts with
const initialState: State = {
  signer: null,
  provider: null,
  chainId: SEPOLIA_CHAIN_ID,
  address: "",
};

type Store = State & Actions;

const useStore = create<Store>()(
  immer((set, get) => ({
    ...initialState,
    setSigner: (signer) => set({ signer }),
    setProvider: (provider) => set({ provider }),
    setChainId: (chainId) => set({ chainId }),
    setAddress: (address) => set({ address }),
    disconnectWallet: () => {
      const { signer, provider } = get();
      signer?.provider?.destroy?.();
      provider?.destroy?.();
      set((state) => {
        state.signer = null;
        state.provider = null;
        state.chainId = SEPOLIA_CHAIN_ID;
        state.address = "";
      });
    },
  })),
);

export default useStore;
