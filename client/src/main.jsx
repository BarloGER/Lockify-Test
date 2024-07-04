import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { validateEnvs } from "./frameworks/configs/envConfig";
import "./frameworks/configs/i18n";
import "./assets/global.css";

validateEnvs();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
