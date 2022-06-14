import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CrowdfundingProvider } from "./context/CrowdfundingContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CrowdfundingProvider>
    <App />
  </CrowdfundingProvider>
);
