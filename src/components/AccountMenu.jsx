// src/components/AccountMenu.jsx
import React from "react";
import useAuthStore from "../store/use-auth-store";
import googleIcon from "../assets/image/google-icon.png"
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
          <img src={googleIcon} alt="Iniciar sesión" className="google-icon" />
          Iniciar sesión con Google
        </button>
      )}
    </div>
  );
};

export default AccountMenu;
