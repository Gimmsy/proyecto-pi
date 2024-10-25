// src/components/Header.jsx
import React from "react";
import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src="/assets/images/logo.png" alt="Logo AquaViva" />
                <span className="company-name">AquaViva</span>
            </div>
            <nav>
                <ul>
                    <li>Inicio</li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
