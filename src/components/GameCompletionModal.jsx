import React from 'react';
import MedalSVG from './Medal';

const GameCompletionModal = ({ score, onClose }) => {
    const getMedalType = (score) => {
        if (score === 100) return 'gold';
        if (score >= 75) return 'silver';
        return 'bronze';
    };

    const getMessage = (score) => {
        if (score === 100) {
            return {
                title: "¡Logro Desbloqueado!",
                message: "Los océanos son el corazón de nuestro planeta. Cada gota de agua que cuidamos, cada acción que tomamos para proteger los recursos hídricos, es un paso hacia la preservación de estos ecosistemas vitales. Juntos podemos hacer la diferencia en la conservación de nuestros océanos y recursos hídricos."
            };
        }
        return {
            title: "Sigue Intentando",
            message: "No te desanimes. Cada intento te acerca más a comprender la importancia de cuidar nuestros recursos hídricos. La práctica y la persistencia son clave para el aprendizaje."
        };
    };

    const { title, message } = getMessage(score);
    const medalType = getMedalType(score);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg text-center max-w-md shadow-2xl">
                <MedalSVG type={medalType} />
                <h2 className="text-2xl font-bold mt-4 text-gray-800">{title}</h2>
                <p className="mt-4 text-gray-600">{message}</p>
                <p className="mt-4 text-gray-600">Tu puntaje fue: <span className="font-bold">{score}</span></p>
                <button
                    onClick={onClose}
                    className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                >
                    Continuar
                </button>
            </div>
        </div>
    );
};

export default GameCompletionModal;