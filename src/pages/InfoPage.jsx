import React, { useState } from "react";
import Sliderbar from "../components/Slidebar"; // Asegúrate de que la ruta es correcta
import Crab from "../components/Crab";
import "../styles/InfoPage.css";
import CrabScene from "../components/Crab";

const InfoPage = () => {
    const [temaSeleccionado, setTemaSeleccionado] = useState("contaminacion");

<<<<<<< HEAD
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
=======
  const temas = {
    contaminacion: {
      titulo: "Contaminación del agua",
      descripcion:
        "La contaminación del agua es la introducción de sustancias perjudiciales en cuerpos de agua, lo cual afecta tanto a la vida marina como a la salud humana.",
      sensibilizacion:
        "Es crucial tomar conciencia sobre el uso responsable del agua y evitar arrojar desechos en ríos, lagos y mares para preservar este recurso vital.",
      imagen: "/assets/image/sensibilizacion-contaminacion-agua.jpg",
      link: "",
    },
    acidificacion: {
      titulo: "Acidificación de los océanos",
      descripcion:
        "La acidificación de los océanos es un proceso causado por la absorción de CO2 en el agua, lo cual reduce su pH y afecta negativamente a los ecosistemas marinos.",
      sensibilizacion:
        "Reducir las emisiones de CO2 es esencial para proteger la biodiversidad marina y mantener el equilibrio de los océanos.",
      imagen: "/assets/image/sensibilizacion-acidificacion-agua.jpg",
      link: "",
    },
    escasez: {
      titulo: "Escasez de agua",
      descripcion:
        "La escasez de agua es la falta de acceso a agua potable suficiente para satisfacer las necesidades básicas de la población. La conservación y gestión adecuada del agua no solo ayudan a combatir la escasez, sino que también permiten que el ciclo del agua siga funcionando de manera eficiente.",
      sensibilizacion:
        "A continuación, podrás ver un modelo interactivo del ciclo del agua que te permitirá explorar sus distintos procesos.",
      imagen: "/assets/image/sensibilizacion-escasez-agua.jpg",
      link: "/WaterCycle",
    },
  };
>>>>>>> b76748fe0e2acc782aaa52a08b5e47ef5f3a059c

    return (
        <div className="info-page-container">
            {/* Sidebar */}
            <Sliderbar />
            {/* Main Content */}
            <div className="main-content">

                <CrabScene />

<<<<<<< HEAD
                <div className="info-section">
                    <MainTopic tema={temas[temaSeleccionado]} />
                    <SecundaryTopic
                        temas={temas}
                        temaSeleccionado={temaSeleccionado}
                        onTemaSelect={setTemaSeleccionado}
                    />
                </div>
            </div>
=======
      <Canvas
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
        camera={{ position: [0, 1, 3], fov: 75 }}
      >
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} intensity={0.5} />
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
          <Crab />
        </Suspense>
      </Canvas>

      <div className="info-page-container">
        <div className="info-page-content">
          <MainTopic tema={temas[temaSeleccionado]} />
        </div>
        <div className="info-page-button">
        <SecundaryTopic
          temas={temas}
          temaSeleccionado={temaSeleccionado}
          onTemaSelect={setTemaSeleccionado}
        />
>>>>>>> b76748fe0e2acc782aaa52a08b5e47ef5f3a059c
        </div>
    );
};

const MainTopic = ({ tema }) => (
<<<<<<< HEAD
    <div className="main-topic-container">
        <h2>{tema.titulo}</h2>
        <img
            src={tema.imagen}
            alt={tema.titulo}
            style={{ width: "100%", borderRadius: "8px" }}
        />
        <p>{tema.descripcion}</p>
        <p>
            <em>{tema.sensibilizacion}</em>
        </p>
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
                <img
                    src={temas[key].imagen}
                    alt={temas[key].titulo}
                    style={{ width: "100%", borderRadius: "8px" }}
                />
                <h3>{temas[key].titulo}</h3>
            </div>
        ))}
    </div>
=======
  <div className="main-topic-container">
    <h2>{tema.titulo}</h2>
    <img
      src={tema.imagen}
      alt={tema.titulo}
      style={{ width: "100%", borderRadius: "8px" }}
    />
    <p>{tema.descripcion}</p>
    <p>
      <em>{tema.sensibilizacion}</em>
    </p>
    <a href={tema.link}>Modelo Interactivo</a>
  </div>
);

const SecundaryTopic = ({ temas, onTemaSelect }) => (
  <div className="secondary-topic-container">
    <h2 className="secondary-topic-title">Otros temas de interés</h2>
    {Object.keys(temas).map((key) => (
      <div
        key={key}
        className="secondary-topic-card"
        onClick={() => onTemaSelect(key)}
      >
        <img
          src={temas[key].imagen}
          alt={temas[key].titulo}
          style={{ width: "100%", borderRadius: "8px" }}
        />
        <h3>{temas[key].titulo}</h3>
      </div>
    ))}
  </div>
>>>>>>> b76748fe0e2acc782aaa52a08b5e47ef5f3a059c
);

export default InfoPage;
