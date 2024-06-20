import React from "react";
import ReactDOM from "react-dom/client";
import "../configs/i18n";
import "./assets/global.css";
import { App } from "./App";
import { validateEnvs } from "../configs/envConfig";

validateEnvs();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
