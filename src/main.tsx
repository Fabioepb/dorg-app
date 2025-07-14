import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Modal from "react-modal";
import "./index.css";
import App from "./App.tsx";
import QueryClientWrapper from "./utils/queryClient.tsx";
import { ToastContainer } from "react-toastify";

// Set the app element for react-modal
Modal.setAppElement("#root");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientWrapper>
      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
      <App />
    </QueryClientWrapper>
  </StrictMode>,
);
