import React from "react";
import "../styles/Card.css";
import { useNavigate } from "react-router-dom";

const Card = ({ title, description, imageUrl, buttonLabel }) => {
    const navigate = useNavigate();

    const handleViewMore = () => {
        // Redirige a la página de información y recarga completamente
        window.location.href = "/info";
    };
    return (
        <div className="card">
            <img src={imageUrl} alt={title} className="card-image" />
            <div className="card-content">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            <div className="card-button-container">
                <button className="card-button">{buttonLabel}</button>
            </div>
        </div>
    );
};

export default Card;