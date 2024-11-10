import React from "react";

const MainTopic = ({ tema }) => (
    <div className="main-topic-container">
        <h2 className="main-topic-title">{tema.titulo}</h2>
        {tema.imagen && (
            <img src={tema.imagen} alt={tema.titulo} className="main-topic-image" />
        )}
        <div className="main-topic-content">
            <p>{tema.descripcion}</p>
            <h4>Sensibilización:</h4>
            <p>{tema.sensibilizacion}</p>
        </div>
    </div>
);

export default MainTopic;
