import React from "react";
import "../styles/Card.css";

const Card = ({ title, description, imageUrl, buttonLabel }) => {
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