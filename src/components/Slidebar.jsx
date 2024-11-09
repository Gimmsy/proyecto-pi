// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import AccountMenu from "../components/AccountMenu"; 
import "../styles/Slidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar horizontal">
      <div className="sidebar-header">
        <img src="/assets/image/logopintado.png" alt="Logo AquaViva" className="logo" />
        <h1>AquaViva</h1>
      </div>
      
      <nav className="sidebar-nav">
      <a href="/home" className="sidebar-item">Inicio</a>
                <a href="/resources" className="sidebar-item">Recursos Adicionales</a>
                <a href="/info" className="sidebar-item">Información</a>
                <a href="/trivia" className="sidebar-item">Trivia</a>
      </nav>

      <div className="account-menu">
        <AccountMenu />
      </div>
    </div>
  );
};

export default Sidebar;
