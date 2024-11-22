import React, { useState } from "react";
import AccountMenu from "../components/AccountMenu";
import "../styles/Slidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header flex items-center justify-between p-4">
        <img src="/assets/image/logopintado.png" alt="Logo AquaViva" className="logo w-20 h-auto mr-4" />
        <h1 className="text-xl font-bold">AquaViva</h1>
        <button className="hamburger text-2xl bg-none border-none cursor-pointer md:hidden" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      <nav className={`sidebar-nav ${isOpen ? "show" : ""} flex flex-col md:flex-row p-4 md:p-0`}>
        <a href="/home" className="sidebar-item text-blue-500 p-2 text-lg transition-colors duration-300 hover:text-blue-700 hover:underline">Inicio</a>
        <a href="/resources" className="sidebar-item text-blue-500 p-2 text-lg transition-colors duration-300 hover:text-blue-700 hover:underline">Recursos Adicionales</a>
        <a href="/info" className="sidebar-item text-blue-500 p-2 text-lg transition-colors duration-300 hover:text-blue-700 hover:underline">Información</a>
        <a href="/trivia" className="sidebar-item text-blue-500 p-2 text-lg transition-colors duration-300 hover:text-blue-700 hover:underline">Trivia</a>
      </nav>

      <div className="account-menu mt-auto p-4 md:p-0">
        <AccountMenu />
      </div>
    </div>
  );
};

export default Sidebar;