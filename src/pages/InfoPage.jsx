import React, { useEffect, useState } from "react";
import Sliderbar from "../components/Slidebar"; // Asegúrate de que la ruta es correcta
import "../styles/InfoPage.css";
import Scene from "../components/Scene";

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
      link: "/waterPollution",
    },
    acidificacion: {
      titulo: "Acidificación de los océanos",
      descripcion:
        "La acidificación de los océanos es un proceso causado por la absorción de CO2 en el agua, lo cual reduce su pH y afecta negativamente a los ecosistemas marinos.",
      sensibilizacion:
        "Reducir las emisiones de CO2 es esencial para proteger la biodiversidad marina y mantener el equilibrio de los océanos.",
      imagen: "/assets/image/sensibilizacion-acidificacion-agua.jpg",
      link: "/ocean",
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

  useEffect(() => {
    const mainContent = document.querySelector(".main-topic-container");
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: "smooth" });
    }
  }, [temaSeleccionado]);

  return (
    <>
      <Sliderbar /> 
      <Scene />
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
        </div>
      </div>
    </>
  );
};

const MainTopic = ({ tema }) => (
  <div className="main-topic-container">
    <h2 className="left-aligned">{tema.titulo}</h2>
    <img
      src={tema.imagen}
      alt={tema.titulo}
      style={{ width: "100%", borderRadius: "8px" }}
    />
    <p>{tema.descripcion}</p>
    <p>
      <em>{tema.sensibilizacion}</em>
    </p>
    <a href={tema.link} className="interactive-button">
      Modelo Interactivo
    </a>
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
);

export default InfoPage;
