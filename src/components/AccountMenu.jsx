// src/components/AccountMenu.jsx
import React from "react";
import useAuthStore from "../store/use-auth-store";
import { GoogleOutlined } from "@ant-design/icons";
import "../styles/AccountMenu.css";

const AccountMenu = () => {
  const { user, loginGoogleWithPopUp, logout } = useAuthStore();

  return (
    <div className="account-menu">
      {user ? (
        <div className="user-info">
          <img src={user.photo} alt={user.name} className="user-photo" />
          <span>{user.name}</span>
          <button onClick={logout}>Cerrar sesión</button>
        </div>
      ) : (
        <button onClick={loginGoogleWithPopUp} className="login-button">
          <img src="/assets/image/google-icon.png" alt="Iniciar sesión" className="google-icon" />
          Log in
        </button>
      )}
    </div>
  );
};

export default AccountMenu;
