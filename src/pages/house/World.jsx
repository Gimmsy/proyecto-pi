/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import React, { useCallback } from "react";
import House from "./House";
import useAuthStore from "../../store/use-auth-store";
import { useNavigate } from "react-router-dom";


const World = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout().then(() => {
      navigate("/");
    });
  }, [logout, navigate]);

  const camerasettings = {
    positions: [0, 0, 15],
    fov: 75,
  };
  return (
    <React.Fragment>
      <button className="button-logout" onClick={handleLogout}>
        Cerrar sesión
      </button>
      <h1 className="tittle">Hello World</h1>
      <Canvas camera={camerasettings}  style={ {width: '100vw', height: '100vh'} }>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 0, 10]} intensity={1.5} castShadow />
        <House />
      </Canvas>
    </React.Fragment>
  );
};

export default World;