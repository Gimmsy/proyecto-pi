import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Stars, Html } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import Isla from "../components/Isla";
import Sliderbar from "../components/Slidebar";
import TitleWaterPollution from "../components/TitleWaterPollution"; // Asegúrate de ajustar la ruta según tu estructura de archivos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faMouse, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "../styles/WaterPollution.css";
import VideoOcean from "../components/OceanPollutionVideo";

const WaterPollution = () => {
  const [showMessage, setShowMessage] = useState(false);
  const messageRef = useRef(null);

  const toggleMessage = () => {
    setShowMessage(!showMessage);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (messageRef.current && !messageRef.current.contains(event.target)) {
        setShowMessage(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [messageRef]);

  return (
    <div className="water-pollution">
      <Sliderbar />
      <Canvas
        shadows
        style={{ width: "100%", height: "100vh" }}
        camera={{ position: [0, 5, 10], fov: 75 }} // Ajusta la posición de la cámara aquí
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          intensity={0.5}
          castShadow
        />
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
            <div className="title">Contaminación del Agua</div>
          </Html>
          <Html position={[0, 0, 0]} center>
            <div className="instructions bg-tertiary text-senary bg-opacity-80 p-4 rounded-lg text-center max-w-xs">
              <p>
                <FontAwesomeIcon icon={faMouse} /> Usa el ratón y el scroll para
                alejar, acercar y girar el modelo.
              </p>
              <p>
                Utiliza las flechas <FontAwesomeIcon icon={faArrowUp} /> y{" "}
                <FontAwesomeIcon icon={faArrowDown} /> para encender y apagar
                las luces.
              </p>
            </div>
          </Html>
          <Html position={[0, -10, 0]} center>
            <div className="absolute bottom-4 right-4 p-2 rounded-lg shadow-lg text-center w-40" ref={messageRef}>
              <button onClick={toggleMessage} className="bg-primary text-white p-2 rounded-full">
                <FontAwesomeIcon icon={faInfoCircle} size="2x" />
              </button>
              {showMessage && (
                <div className="mt-2 p-2 bg-white bg-opacity-80 text-secondary rounded-lg shadow-lg">
                  El agua se ensucia por cosas como basura, productos químicos o desechos que la gente tira.
                </div>
              )}
            </div>
          </Html>
          <Physics>
            <Isla />
            <TitleWaterPollution position={[0, 5, 0]} />
          </Physics>
          <VideoOcean name="screen" position-y={0} position-x={40} scale={15} />
        </Suspense>
        <EffectComposer>
          <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} height={300} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default WaterPollution;