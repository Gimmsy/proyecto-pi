import React from "react";

const SecundaryTopic = ({ temas, temaSeleccionado, onTemaSelect }) => {
    const secondaryTopics = Object.keys(temas).filter(
        (tema) => tema !== temaSeleccionado
    );

    return (
        <div className="secondary-topics-container">
            {secondaryTopics.map((tema) => (
                <div
                    key={tema}
                    className="secondary-topic-card"
                    onClick={() => {
                        console.log("Tema seleccionado:", tema);
                        onTemaSelect(tema);
                    }}
                >
                    <img
                        src={temas[tema].imagen}
                        alt={temas[tema].titulo}
                        className="secondary-topic-image"
                    />
                    <h3 className="secondary-topic-title">{temas[tema].titulo}</h3>
                </div>
            ))}
        </div>
    );
};

export default SecundaryTopic;
