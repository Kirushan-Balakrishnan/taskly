import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { initializeAxios } from "./services/axios.ts";
import React from "react";

function render() {
  const container = document.getElementById("root");
  if (!container) {
    return null;
  }
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

(() => {
  initializeAxios();
  render();
})();
