import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Stars, Html } from "@react-three/drei";
import Isla from "../components/Isla"; // Asegúrate de que la ruta es correcta
import "../styles/WaterPollution.css"; // Importa el archivo CSS con la extensión correcta

const WaterPollution = () => {
  return (
    <div className="water-pollution">
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
            <div className="instructions">
              Usa las flechas arriba y abajo para prender y apagar las luces.
            </div>
          </Html>
          <Isla />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default WaterPollution;