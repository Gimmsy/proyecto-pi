// src/index.js (o src/index.jsx)
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; 
import "./styles/Global.css"; 

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />  // Asegúrate de que App esté correctamente importado y tenga la exportación por defecto
  </React.StrictMode>
);
