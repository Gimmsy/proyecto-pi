import React, { useState, useEffect, useRef } from "react";
import useAuthStore from "../store/use-auth-store";
import ParticipationMedal from "./ParticipationMedal";

const AccountMenu = () => {
  const { user, loginGoogleWithPopUp, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(user?.photoURL || "/assets/image/avatar.jpg");
  const menuRef = useRef(null);

  // Función para alternar el menú desplegable
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Función para manejar errores en la carga de la imagen
  const handleImageError = () => {
    setAvatarSrc("/assets/image/avatar.jpg"); // Ruta de la imagen por defecto
  };

  // Cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    setAvatarSrc(user?.photoURL || "/assets/image/avatar.jpg");
  }, [user]);

  return (
    <div className="relative" ref={menuRef}>
      {user ? (
        <div className="flex items-center cursor-pointer">
          {/* Foto de perfil */}
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={avatarSrc}
              alt={user.displayName || "Usuario"}
              onError={handleImageError}
              className="w-full h-full object-cover"
              onClick={toggleMenu}
            />
          </div>
          {/* Nombre del usuario */}
          {/* <span className="ml-2">{user.displayName}</span> */}

          {/* Menú desplegable */}
          {isMenuOpen && (
            <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded-lg shadow-md p-4 w-52 z-10">
              <p className="mb-2 text-primary">{user.displayName}</p>
              <p className="mb-2 truncate">{user.email}</p>
              <ParticipationMedal puzzleCompleted={user.puzzleCompleted} />
              <button
                onClick={logout}
                className="w-full py-2 text-white bg-alert rounded-lg hover:bg-alert-2"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      ) : (
        // Botón de inicio de sesión
        <button
          onClick={loginGoogleWithPopUp}
          className="fixed top-4 right-7  flex items-center space-x-2 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md"
        >
          <img
            src="/assets/image/google-icon.png"
            alt="Iniciar sesión"
            className="w-6 h-6 object-contain"
          />
          <span>Log in</span>
        </button>
      )}
    </div>
  );
};

export default AccountMenu;