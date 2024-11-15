import React, { useState } from "react";
import Sliderbar from "../components/Slidebar"; // Asegúrate de que la ruta es correcta
import "../styles/InfoPage.css";
import CrabScene from "../components/Crab";

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

  return (
    <>
      <Sliderbar />
      <CrabScene />
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
);

export default InfoPage;
