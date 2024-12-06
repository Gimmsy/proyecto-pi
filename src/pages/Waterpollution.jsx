import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Stars, Html } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import Isla from "../components/Isla";
import Sliderbar from "../components/Slidebar";
import TitleWaterPollution from "../components/TitleWaterPollution"; // Asegúrate de ajustar la ruta según tu estructura de archivos
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import "../styles/WaterPollution.css"; // Importa el archivo CSS con la extensión correcta


const WaterPollution = () => {
  return (
    <div className="water-pollution">
      <Sliderbar />
      <Canvas
        shadows
        style={{ width: "100%", height: "100vh" }}
        camera={{ position: [0, 5, 10], fov: 75 }} // Ajusta la posición de la cámara aquí
      >
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} intensity={0.5} castShadow />
        <Sky
          distance={450000}
          sunPosition={[100, 20, 100]}
          inclination={0}
          azimuth={0.05}
        />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
        />
        <OrbitControls />
        <Suspense fallback={null}>
          <Html position={[0, 10, 0]} center>
            <div className="title">
              Contaminación del Agua
            </div>
          </Html>
          <Html position={[0, 0, 0]} center>
            <div className="instructions bg-white bg-opacity-80 p-4 rounded-lg text-center max-w-xs">
              Usa las flechas <FontAwesomeIcon icon={faArrowUp} /> y <FontAwesomeIcon icon={faArrowDown} /> para prender y apagar las luces.
            </div>
          </Html>
          <Physics>
            <Isla />
            <TitleWaterPollution position={[0, 5, 0]} />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default WaterPollution;