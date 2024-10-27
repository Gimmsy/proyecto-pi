// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import AccountMenu from "../components/AccountMenu"; 
import "../styles/Slidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/assets/images/logo.png" alt="Logo AquaViva" className="logo" />
        <h1>AquaViva</h1>
      </div>
      
      <nav className="sidebar-nav">
        <Link to="/home" className="sidebar-item">Inicio</Link>
        <Link to="/resources" className="sidebar-item">Recursos Adicionales</Link>
        <Link to="/info" className="sidebar-item">Información</Link>
        <Link to="/trivia" className="sidebar-item">Trivia</Link>
      </nav>

      <div className="account-menu">
        <AccountMenu />
      </div>
    </div>
  );
};

export default Sidebar;
