import React from "react";
import ReactDOM from "react-dom/client";
import { AdminPage } from "./pages/AdminPage";

const root = document.getElementById("root");
if (!root) throw new Error("No root element found");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AdminPage />
  </React.StrictMode>
);
