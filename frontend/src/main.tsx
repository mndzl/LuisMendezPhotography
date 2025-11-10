import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import "bootstrap/dist/css/bootstrap.css";
import { HashRouter, Route, Routes } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
