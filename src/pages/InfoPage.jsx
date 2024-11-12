import React, { Suspense, useEffect, useState } from "react";
import Sliderbar from "../components/Slidebar";
import { Canvas } from "@react-three/fiber";
import Crab from "../components/Crab";
import { OrbitControls, Sky, Stars } from "@react-three/drei";

const InfoPage = () => {
    const [temaSeleccionado, setTemaSeleccionado] = useState("contaminacion");

    const temas = {
        contaminacion: {
            titulo: "Contaminación del agua",
            descripcion:
                "La contaminación del agua es la introducción de sustancias perjudiciales en cuerpos de agua, lo cual afecta tanto a la vida marina como a la salud humana.",
            sensibilizacion:
                "Es crucial tomar conciencia sobre el uso responsable del agua y evitar arrojar desechos en ríos, lagos y mares para preservar este recurso vital.",
            imagen: "/assets/image/sensibilizacion-contaminacion-agua.jpg",
        },
        acidificacion: {
            titulo: "Acidificación de los océanos",
            descripcion:
                "La acidificación de los océanos es un proceso causado por la absorción de CO2 en el agua, lo cual reduce su pH y afecta negativamente a los ecosistemas marinos.",
            sensibilizacion:
                "Reducir las emisiones de CO2 es esencial para proteger la biodiversidad marina y mantener el equilibrio de los océanos.",
            imagen: "/assets/image/sensibilizacion-acidificacion-agua.jpg",
        },
        escasez: {
            titulo: "Escasez de agua",
            descripcion:
                "La escasez de agua es la falta de acceso a agua potable suficiente para satisfacer las necesidades básicas de la población.",
            sensibilizacion:
                "Es fundamental conservar el agua y buscar soluciones sostenibles para asegurar su disponibilidad para futuras generaciones.",
            imagen: "/assets/image/sensibilizacion-escasez-agua.jpg",
        },
    };

    useEffect(() => {
        const mainContent = document.querySelector(".main-topic-container");
        if (mainContent) {
            mainContent.scrollIntoView({ behavior: "smooth" });
        }
    }, [temaSeleccionado]);

    return (
        <>
            <Sliderbar />
            <Canvas style={{ width: '100%', height: '100vh' }} camera={{ position: [0, 1, 3], fov: 75 }}>
                <ambientLight intensity={1} />
                <spotLight position={[10, 10, 10]} angle={0.15} intensity={0.5} />
                <Sky distance={450000} sunPosition={[100, 20, 100]} inclination={0} azimuth={0.05} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
                <OrbitControls />
                <Suspense fallback={null}>
                    <Crab />
                </Suspense>
            </Canvas>

            {/* <div className="info-page-container">
                <div className="info-page-content">
                    <MainTopic tema={temas[temaSeleccionado]} />
                    <SecundaryTopic
                        temas={temas}
                        temaSeleccionado={temaSeleccionado}
                        onTemaSelect={setTemaSeleccionado}
                    />
                </div>
            </div> */}
        </>
    );
};

const MainTopic = ({ tema }) => (
    <div className="main-topic-container">
        <h2>{tema.titulo}</h2>
        <img src={tema.imagen} alt={tema.titulo} style={{ width: '100%', borderRadius: '8px' }} />
        <p>{tema.descripcion}</p>
        <p><em>{tema.sensibilizacion}</em></p>
    </div>
);

const SecundaryTopic = ({ temas, onTemaSelect }) => (
    <div className="secondary-topic-container">
        {Object.keys(temas).map((key) => (
            <div
                key={key}
                className="secondary-topic-card"
                onClick={() => onTemaSelect(key)}
            >
                <img src={temas[key].imagen} alt={temas[key].titulo} style={{ width: '100%', borderRadius: '8px' }} />
                <h3>{temas[key].titulo}</h3>
            </div>
        ))}
    </div>
);

export default InfoPage;
