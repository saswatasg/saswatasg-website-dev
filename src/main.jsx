import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "@/index.css";
import "@/styles/creative-scoped.css";
import "@/styles/two-world-flow.css";
import "@/styles/workbench-editorial.css";
import "@/styles/workbench-pages.css";
import "@/styles/workbench-system.css";
import "@fontsource/noto-serif-bengali/bengali-400.css";

const container = document.getElementById("root");
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

const staticRoute = document.documentElement.dataset.route;
const requestedRoute =
  window.location.pathname +
  (window.location.pathname === "/contact" &&
  new URLSearchParams(window.location.search).get("world") === "adda"
    ? "?world=adda"
    : "");
if (staticRoute && staticRoute !== requestedRoute) container.replaceChildren();
document.documentElement.classList.remove("route-bootstrap");
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}
