import React, { useEffect, useState } from "react";
import Sliderbar from "../components/Slidebar"; // Asegúrate de que la ruta es correcta
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
      <div className="info-page-container flex justify-center items-center w-3/4 h-3/4 bg-white rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="info-page-content flex gap-5 w-2/3 h-5/6 font-sans p-4">
          <MainTopic tema={temas[temaSeleccionado]} />
        </div>
        <div className="info-page-buttons w-1/3 p-5 border-l border-primary">
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
  <div className="main-topic-container bg-white rounded-lg overflow-hidden w-full flex flex-col p-4 text-left mr-5">
    <h2 className="text-left">{tema.titulo}</h2>
    <img
      src={tema.imagen}
      alt={tema.titulo}
      className="w-full h-64 object-cover rounded-lg"
    />
    <p>{tema.descripcion}</p>
    <p>
      <em>{tema.sensibilizacion}</em>
    </p>
    <a href={tema.link} className="bg-primary w-64 text-white px-4 py-2 rounded-md mt-4 text-center transition-colors hover:bg-quaternary">
      Modelo Interactivo
    </a>
  </div>
);

const SecundaryTopic = ({ temas, onTemaSelect }) => (
  <div className="secondary-topic-container flex flex-col gap-2 w-full">
    <h2 className="secondary-topic-title text-xl font-bold text-primary mb-4">Otros temas de interés</h2>
    {Object.keys(temas).map((key) => (
      <div
        key={key}
        className="secondary-topic-card bg-white border border-quaternary rounded-lg shadow-md p-4 cursor-pointer transition-transform transform hover:scale-105 flex flex-col items-center w-full"
        onClick={() => onTemaSelect(key)}
      >
        <img
          src={temas[key].imagen}
          alt={temas[key].titulo}
          className="w-full h-24 object-cover rounded-lg"
        />
        <h3 className="text-lg mt-2">{temas[key].titulo}</h3>
      </div>
    ))}
  </div>
);

export default InfoPage;