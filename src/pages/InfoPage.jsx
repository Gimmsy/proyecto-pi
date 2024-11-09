import React from "react";
import Sliderbar from "../components/Slidebar";

const InfoPage = () => {
    return (
        <div className="info-page">
            <Sliderbar />
            <div className="info-content">
                <h2>Contaminación del agua</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                {/* Aquí va el contenido detallado como en la imagen de referencia */}
            </div>
        </div>
    );
};

export default InfoPage;