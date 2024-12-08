import React, { useState } from "react";
import useAuthStore from "../store/use-auth-store";

const AccountMenu = () => {
  const { user, loginGoogleWithPopUp, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      {user ? (
        <div className="flex items-center cursor-pointer">
          {/* Foto de perfil que al hacer click abre el menú */}
          <img
            src={user.photo}
            alt={user.name}
            className="w-10 h-10 rounded-full mr-2 cursor-pointer"
            onClick={toggleMenu}
          />
          <span>{user.name}</span>
          {/* Menú desplegable */}
          {isMenuOpen && (
            <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded-lg shadow-md p-4 w-52 z-10">
              <p className="mb-2">{user.email}</p>
              <button
                onClick={logout}
                className="w-full py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={loginGoogleWithPopUp}
          className="flex items-center space-x-2 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <img
            src="/assets/image/google-icon.png"
            alt="Iniciar sesión"
            className="w-5 h-5"
          />
          <span>Log in</span>
        </button>
      )}
    </div>
  );
};

export default AccountMenu;
