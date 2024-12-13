import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ title, description, imageUrl, buttonLabel }) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    // Navega a /info sin recargar la página
    navigate("/info");
  };

  return (
    <div className="bg-white font-sans border border-gray-300 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 w-full max-w-xs h-auto flex flex-col items-center mb-4">
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4 flex-grow bg-white">
        <h2 className="text-lg mb-2 text-left text-primary">{title}</h2>
        <p className="text-sm text-gray-600 text-left">{description}</p>
      </div>
      <div className="flex justify-center p-4 bg-white">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md transition-colors hover:bg-blue-600"
          onClick={handleViewMore}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default Card;