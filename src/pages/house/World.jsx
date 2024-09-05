/* eslint-disable react/no-unknown-property */
import { OrbitControls } from "@react-three/drei";
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
    positions: [2, 0, 5],
    fov: 75,
  };
  return (
    <React.Fragment>
      <button className="button-logout" onClick={handleLogout}>
        Cerrar sesión
      </button>
      <h1 className="tittle">Hello World</h1>
      <Canvas camera={camerasettings}>
        <OrbitControls enablePan={false} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[0, 10, 10]} intensity={5} />
        <House />
      </Canvas>
    </React.Fragment>
  );
};

export default World;