import React, { useState } from "react";
import { Link } from "react-router-dom";
import AccountMenu from "../components/AccountMenu";
import "../styles/Slidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="hamburger text-2xl bg-primary text-white rounded md:hidden p-2 mr-4" onClick={toggleMenu}>
        ☰
      </button>
      <Link to="/home" className="sidebar-header flex items-center justify-between p-12">
        <img src="/assets/image/logopintado.png" alt="Logo AquaViva" className="logo w-20 h-auto mr-4" />
        <h1 className="text-xl font-bold">AquaViva</h1>
      </Link>

      <nav className={`sidebar-nav ${isOpen ? "show" : ""} flex flex-col md:flex-row p-4 md:p-0`}>
        <Link to="/home" className="sidebar-item text-blue-500 p-2 text-lg transition-colors duration-300 hover:text-blue-700 hover:underline">Inicio</Link>
        <Link to="/info" className="sidebar-item text-blue-500 p-2 text-lg transition-colors duration-300 hover:text-blue-700 hover:underline">Información</Link>
        <Link to="/trivia" className="sidebar-item text-blue-500 p-2 text-lg transition-colors duration-300 hover:text-blue-700 hover:underline">Trivia</Link>
      </nav>

      <div className="account-menu mt-auto p-4 md:p-0">
        <AccountMenu />
      </div>
    </div>
  );
};

export default Sidebar;