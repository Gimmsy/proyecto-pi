import React, { Suspense, useState } from "react";
import Sliderbar from "../components/Slidebar";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import OceanText from "../components/OceanText";
import Staging from "../components/Staging";
import Umbrella from "../components/Umbrella";
import Beach from "../components/Beach";
import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import PostProcessing from "../components/PostProcessing";
import Video from "../components/VideoOcean";

const OceanAcidification = () => {
  const [activeSection, setActiveSection] = useState(null);
  const handleButtonClick = (section) => {
    setActiveSection((prevSection) => (prevSection === section ? null : section));
  }
  return (
    <>
      <Sliderbar />
      <div className="absolute flex items-center justify-center w-screen h-screen overflow-hidden">
        <div className="button-container absolute top-3/4 left-1/3 transform -translate-x-1/2 flex gap-5 z-30">
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
          <button
            onClick={() => handleButtonClick("soluciones")}
            className={`px-6 py-3 font-sans text-base font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-md transition-all duration-300 hover:from-blue-700 hover:to-blue-900 transform ${activeSection === "soluciones" ? "bg-gradient-to-r from-blue-900 to-blue-700 shadow-inner" : ""}`}
          >
            Soluciones
          </button>
          <button
            onClick={() => handleButtonClick("instrucciones")}
            className={`px-6 py-3 font-sans text-base font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-md transition-all duration-300 hover:from-blue-700 hover:to-blue-900 transform ${activeSection === "instrucciones" ? "bg-gradient-to-r from-blue-900 to-blue-700 shadow-inner" : ""}`}
          >
            Instrucciones
          </button>
        </div>
        {activeSection && (
          <div className="info-container absolute top-6/5 right-0 transform -translate-x-1/4 bg-white bg-opacity-90 text-gray-800 p-5 rounded-lg w-auto max-w-lg text-center min-h-[60vh] max-h-[70vh] overflow-y-auto scroll-smooth z-30 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              {activeSection === "acidificacion" && "Acidificación de los Océanos"}
              {activeSection === "sensibilizacion" && "Sensibilización"}
              {activeSection === "tips" && "Tips"}
              {activeSection === "soluciones" && "Soluciones"}
              {activeSection === "instrucciones" && "Instrucciones"}
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
                  <li className="mb-3">Reduce tu consumo de energía: Utiliza bombillas LED, apaga dispositivos electrónicos cuando no los uses y mejora la eficiencia energética de tu hogar.</li>
                  <li className="mb-3">Opta por transporte sostenible: Usa transporte público, bicicleta, o camina para disminuir las emisiones de carbono.</li>
                  <li className="mb-3">Apoya la conservación marina: Participa en programas de limpieza de playas y apoya organizaciones que protegen ecosistemas marinos.</li>
                  <li className="mb-3">Practica el principio de las 3R: Reduce, reutiliza y recicla para minimizar tu huella de carbono.</li>
                  <li className="mb-3">Consume productos locales y de temporada: Reduce las emisiones asociadas al transporte de alimentos.</li>
                </ul>
              </div>
            )}
            {activeSection === "soluciones" && (
              <div className="extended-info">
                <p className="mb-5 text-base leading-7">
                  Algunas soluciones para combatir la acidificación de los océanos:
                </p>
                <ul className="list-disc list-inside mb-5">
                  <li className="mb-3">Reducción drástica de emisiones de CO2: Implementar políticas globales para descarbonizar la economía y limitar el calentamiento global.</li>
                  <li className="mb-3">Protección de ecosistemas marinos: Crear y expandir áreas marinas protegidas, especialmente arrecifes de coral y manglares.</li>
                  <li className="mb-3">Investigación y tecnología: Desarrollar técnicas de restauración marina y métodos para capturar y almacenar carbono.</li>
                  <li className="mb-3">Educación y concientización: Informar a comunidades y gobiernos sobre el impacto de la acidificación oceánica.</li>
                  <li className="mb-3">Innovación en energías renovables: Acelerar la transición hacia energías limpias como solar, eólica y mareomotriz.</li>
                </ul>
              </div>
            )}
            {activeSection === "instrucciones" && (
              <div className="extended-info">
                <p className="mb-5 text-base leading-7">
                  Interacciones disponibles en el modelo:
                </p>
                <ul className="list-disc list-inside mb-5">
                  <li className="mb-3">Sombrilla: Haz clic para activar/desactivar.</li>
                  <li className="mb-3">Tabla de surf: Haz clic para cambiar de color.</li>
                  <li className="mb-3">Tecla W: Presiona para cambiar el color de la silla.</li>
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
          <Suspense fallback={null}>
          <Perf position={"bottom-left"} />
          <PostProcessing />
          <Physics>
            <Umbrella position={[-1, -1.6, 2]} />
            <OceanText />
            <Beach scale={[0.8, 0.8, 0.8]} />
            <OrbitControls
              enableZoom={true}
              minDistance={15}
              maxDistance={35}
              target={[12, 0, 0]}
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
          </Physics>
          <Video name="screen" position-y={0} position-x={40} scale={15}  />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default OceanAcidification;