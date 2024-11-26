import React, { useState } from "react";
import Sliderbar from "../components/Slidebar";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Crab from "../components/Crab";
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
      <div className="absolute flex items-center justify-center w-screen h-screen overflow-hidden">
        <div className="button-container absolute top-3/4 left-1/5 transform -translate-x-1/2 flex gap-5 z-30">
          <button
            onClick={() => handleButtonClick("acidificacion")}
            className={`px-6 py-3 font-sans text-base font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-md transition-all duration-300 hover:from-blue-700 hover:to-blue-900 transform ${activeSection === "acidificacion" ? "bg-gradient-to-r from-blue-900 to-blue-700 shadow-inner" : ""}`}
          >
            ¿Qué es la acidificación de los océanos?
          </button>
          <button
            onClick={() => handleButtonClick("sensibilizacion")}
            className={`px-6 py-3 font-sans text-base font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-md transition-all duration-300 hover:from-blue-700 hover:to-blue-900 transform ${activeSection === "sensibilizacion" ? "bg-gradient-to-r from-blue-900 to-blue-700 shadow-inner" : ""}`}
          >
            Sensibilización
          </button>
          <button
            onClick={() => handleButtonClick("tips")}
            className={`px-6 py-3 font-sans text-base font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-md transition-all duration-300 hover:from-blue-700 hover:to-blue-900 transform ${activeSection === "tips" ? "bg-gradient-to-r from-blue-900 to-blue-700 shadow-inner" : ""}`}
          >
            Tips
          </button>
        </div>
        {activeSection && (
          <div className="info-container absolute top-8 left-4/5 transform -translate-x-1/2 bg-white bg-opacity-90 text-gray-800 p-5 rounded-lg w-2/5 max-w-lg text-center max-h-3/4 overflow-y-auto z-30 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              {activeSection === "acidificacion" && "Acidificación de los Océanos"}
              {activeSection === "sensibilizacion" && "Sensibilización"}
              {activeSection === "tips" && "Tips"}
            </h2>
            {activeSection === "acidificacion" && (
              <div className="extended-info">
                <p className="mb-5 text-base leading-7">
                  La acidificación de los océanos es el resultado de la
                  absorción de dióxido de carbono (CO2) por parte de los
                  océanos, lo que cambia el equilibrio químico del agua,
                  disminuyendo el pH. Esto afecta la capacidad de muchos
                  organismos marinos para construir estructuras de carbonato
                  de calcio, como conchas y corales.
                </p>
                <p className="mb-5 text-base leading-7">
                  Los océanos absorben aproximadamente un cuarto del CO2 que liberamos
                  a la atmósfera cada año. Cuando el CO2 se disuelve en el agua de mar,
                  forma ácido carbónico, que aumenta la acidez del océano. Desde el
                  inicio de la Revolución Industrial, el pH de las aguas superficiales
                  del océano ha disminuido en aproximadamente 0.1 unidades, lo que
                  representa un aumento del 30% en la acidez.
                </p>
                <h3 className="text-xl font-bold text-blue-500 mb-4">Impactos principales:</h3>
                <ul className="list-disc list-inside mb-5">
                  <li className="mb-3">Impacto en los arrecifes de coral: Los corales tienen dificultades para construir sus esqueletos de carbonato de calcio</li>
                  <li className="mb-3">Afecta la cadena alimentaria marina: Desde el plancton hasta los peces más grandes</li>
                  <li className="mb-3">Riesgos para la pesca y la seguridad alimentaria: Afecta directamente a las comunidades que dependen de la pesca</li>
                  <li className="mb-3">Alteración de ecosistemas: Cambios en la biodiversidad marina y las relaciones entre especies</li>
                  <li className="mb-3">Impacto económico: Afectación a industrias como la pesca, el turismo y la acuicultura</li>
                </ul>
                <p className="text-base leading-7">
                  Este proceso está ocurriendo a una velocidad sin precedentes en la
                  historia geológica de la Tierra, lo que dificulta la adaptación
                  de muchas especies marinas a estas nuevas condiciones.
                </p>
              </div>
            )}
            {activeSection === "sensibilizacion" && (
              <div className="extended-info">
                <div className="sabias-que bg-blue-100 border-l-4 border-blue-500 p-4 mb-5 rounded-r-lg">
                  <p className="text-base leading-7">
                    <strong className="text-blue-500 font-semibold">¿Sabías qué...</strong> el océano absorbe alrededor de 22 millones
                    de toneladas de CO2 cada día? ¡Esto equivale al peso de 2,200 Torre Eiffel!
                  </p>
                </div>
                <div className="sabias-que bg-blue-100 border-l-4 border-blue-500 p-4 mb-5 rounded-r-lg">
                  <p className="text-base leading-7">
                    <strong className="text-blue-500 font-semibold">¿Sabías qué...</strong> los océanos son responsables de producir
                    más del 50% del oxígeno que respiramos? ¡Esto significa que cada segundo
                    respiro proviene del océano!
                  </p>
                </div>
                <div className="sabias-que bg-blue-100 border-l-4 border-blue-500 p-4 mb-5 rounded-r-lg">
                  <p className="text-base leading-7">
                    <strong className="text-blue-500 font-semibold">¿Sabías qué...</strong> si continúa la tendencia actual,
                    para el año 2100 los océanos podrían ser un 150% más ácidos que
                    en la época preindustrial?
                  </p>
                </div>
                <div className="sabias-que bg-blue-100 border-l-4 border-blue-500 p-4 mb-5 rounded-r-lg">
                  <p className="text-base leading-7">
                    <strong className="text-blue-500 font-semibold">¿Sabías qué...</strong> las conchas de algunos organismos marinos
                    pueden comenzar a disolverse en agua de mar más ácida? Esto ya está
                    afectando a especies como los pterópodos, conocidos como "mariposas del mar".
                  </p>
                </div>
                <div className="sabias-que bg-blue-100 border-l-4 border-blue-500 p-4 mb-5 rounded-r-lg">
                  <p className="text-base leading-7">
                    <strong className="text-blue-500 font-semibold">¿Sabías qué...</strong> los arrecifes de coral proveen hogar
                    al 25% de toda la vida marina? ¡Y son uno de los ecosistemas más
                    amenazados por la acidificación!
                  </p>
                </div>
                <h3 className="text-xl font-bold text-blue-500 mb-4">¿Por qué es importante?</h3>
                <ul className="list-disc list-inside mb-5">
                  <li className="mb-3">Más de 1000 millones de personas dependen del océano para su alimentación</li>
                  <li className="mb-3">La industria pesquera genera empleos para más de 500 millones de personas</li>
                  <li className="mb-3">Los arrecifes de coral protegen las costas de tormentas y erosión</li>
                  <li className="mb-3">La biodiversidad marina es esencial para el equilibrio del planeta</li>
                </ul>
              </div>
            )}
            {activeSection === "tips" && (
              <div className="extended-info">
                <p className="mb-5 text-base leading-7">
                  Aquí algunos consejos para ayudar a reducir la acidificación:
                </p>
                <ul className="list-disc list-inside mb-5">
                  <li className="mb-3">Reduce tu consumo de energía</li>
                  <li className="mb-3">Utiliza transporte público o bicicleta</li>
                  <li className="mb-3">Apoya la conservación marina</li>
                  <li className="mb-3">Reduce, reutiliza y recicla</li>
                </ul>
              </div>
            )}
          </div>
        )}
        <Canvas
          className="canvas-3d-container w-full h-full"
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