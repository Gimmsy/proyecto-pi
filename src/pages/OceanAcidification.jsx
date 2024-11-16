import React, { useState } from "react";
import Sliderbar from "../components/Slidebar";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Crab from "../components/Crab";
import "../styles/OceanAcidification.css";
import OceanText from "../components/OceanText";
import Staging from "../components/Staging";

const OceanAcidification = () => {
  const [activeSection, setActiveSection] = useState(null);
  const handleButtonClick = (section) => {
    setActiveSection((prevSection) => (prevSection === section ? null : section));
  }
  return (
    <>
      <Sliderbar />
      <div className="home-container">
        <div className="button-container">
          <button
            onClick={() => handleButtonClick("acidificacion")}
            className={activeSection === "acidificacion" ? "active" : ""}
          >
            ¿Qué es la acidificación de los océanos?
          </button>
          <button
            onClick={() => handleButtonClick("sensibilizacion")}
            className={activeSection === "sensibilizacion" ? "active" : ""}
          >
            Sensibilización
          </button>
          <button
            onClick={() => handleButtonClick("tips")}
            className={activeSection === "tips" ? "active" : ""}
          >
            Tips
          </button>
        </div>
        {activeSection && (
          <div className="info-container">
            <h2>
              {activeSection === "acidificacion" && "Acidificación de los Océanos"}
              {activeSection === "sensibilizacion" && "Sensibilización"}
              {activeSection === "tips" && "Tips"}
            </h2>
            {activeSection === "acidificacion" && (
              <div className="extended-info">
                <p>
                  La acidificación de los océanos es el resultado de la
                  absorción de dióxido de carbono (CO2) por parte de los
                  océanos, lo que cambia el equilibrio químico del agua,
                  disminuyendo el pH. Esto afecta la capacidad de muchos
                  organismos marinos para construir estructuras de carbonato
                  de calcio, como conchas y corales.
                </p>
                <p>
                  Los océanos absorben aproximadamente un cuarto del CO2 que liberamos
                  a la atmósfera cada año. Cuando el CO2 se disuelve en el agua de mar,
                  forma ácido carbónico, que aumenta la acidez del océano. Desde el
                  inicio de la Revolución Industrial, el pH de las aguas superficiales
                  del océano ha disminuido en aproximadamente 0.1 unidades, lo que
                  representa un aumento del 30% en la acidez.
                </p>
                <h3>Impactos principales:</h3>
                <ul>
                  <li>Impacto en los arrecifes de coral: Los corales tienen dificultades para construir sus esqueletos de carbonato de calcio</li>
                  <li>Afecta la cadena alimentaria marina: Desde el plancton hasta los peces más grandes</li>
                  <li>Riesgos para la pesca y la seguridad alimentaria: Afecta directamente a las comunidades que dependen de la pesca</li>
                  <li>Alteración de ecosistemas: Cambios en la biodiversidad marina y las relaciones entre especies</li>
                  <li>Impacto económico: Afectación a industrias como la pesca, el turismo y la acuicultura</li>
                </ul>
                <p>
                  Este proceso está ocurriendo a una velocidad sin precedentes en la
                  historia geológica de la Tierra, lo que dificulta la adaptación
                  de muchas especies marinas a estas nuevas condiciones.
                </p>
              </div>
            )}
            {activeSection === "sensibilizacion" && (
              <div className="extended-info">
                <div className="sabias-que">
                  <p>
                    <strong>¿Sabías qué...</strong> el océano absorbe alrededor de 22 millones
                    de toneladas de CO2 cada día? ¡Esto equivale al peso de 2,200 Torre Eiffel!
                  </p>
                </div>
                <div className="sabias-que">
                  <p>
                    <strong>¿Sabías qué...</strong> los océanos son responsables de producir
                    más del 50% del oxígeno que respiramos? ¡Esto significa que cada segundo
                    respiro proviene del océano!
                  </p>
                </div>
                <div className="sabias-que">
                  <p>
                    <strong>¿Sabías qué...</strong> si continúa la tendencia actual,
                    para el año 2100 los océanos podrían ser un 150% más ácidos que
                    en la época preindustrial?
                  </p>
                </div>
                <div className="sabias-que">
                  <p>
                    <strong>¿Sabías qué...</strong> las conchas de algunos organismos marinos
                    pueden comenzar a disolverse en agua de mar más ácida? Esto ya está
                    afectando a especies como los pterópodos, conocidos como "mariposas del mar".
                  </p>
                </div>
                <div className="sabias-que">
                  <p>
                    <strong>¿Sabías qué...</strong> los arrecifes de coral proveen hogar
                    al 25% de toda la vida marina? ¡Y son uno de los ecosistemas más
                    amenazados por la acidificación!
                  </p>
                </div>
                <h3>¿Por qué es importante?</h3>
                <ul>
                  <li>Más de 1000 millones de personas dependen del océano para su alimentación</li>
                  <li>La industria pesquera genera empleos para más de 500 millones de personas</li>
                  <li>Los arrecifes de coral protegen las costas de tormentas y erosión</li>
                  <li>La biodiversidad marina es esencial para el equilibrio del planeta</li>
                </ul>
              </div>
            )}
            {activeSection === "tips" && (
              <div className="extended-info">
                <p>
                  Aquí algunos consejos para ayudar a reducir la acidificación:
                </p>
                <ul>
                  <li>Reduce tu consumo de energía</li>
                  <li>Utiliza transporte público o bicicleta</li>
                  <li>Apoya la conservación marina</li>
                  <li>Reduce, reutiliza y recicla</li>
                </ul>
              </div>
            )}
          </div>
        )}
        <Canvas
          className="canvas-3d-container"
          camera={{ position: [0, 0, 25], fov: 75 }}
          shadows
        >
          <OceanText />
          <Crab scale={[0.3, 0.3, 0.3]} />
          <OrbitControls
            enableZoom={true}
            minDistance={15}
            maxDistance={35}
            target={[10, 0, 0]}
          />
          <ambientLight
            intensity={1}
          />
          <directionalLight
            position={[10, 10, 10]}
            intensity={1}
            castShadow
          />
          <Staging />
        </Canvas>
      </div>
    </>
  );
};

export default OceanAcidification;
