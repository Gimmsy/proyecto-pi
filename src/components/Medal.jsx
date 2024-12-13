import React from 'react';

const Medal = ({ type = 'bronze' }) => {
    const colors = {
        bronze: { main: '#CD7F32', shadow: '#8B4513' },
        silver: { main: '#C0C0C0', shadow: '#708090' },
        gold: { main: '#FFD700', shadow: '#DAA520' }
    };

    const selectedColor = colors[type] || colors.bronze;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 150"
            className="w-40 h-60 mx-auto"
        >
            {/* Medal Shadow */}
            <path
                d="M25 135 L50 120 L75 135 L65 110 L50 95 L35 110 Z"
                fill={selectedColor.shadow}
            />

            {/* Medal Body */}
            <circle
                cx="50"
                cy="75"
                r="40"
                fill={selectedColor.main}
            />

            {/* Ribbon */}
            <path
                d="M25 135 L50 120 L75 135 L50 150 Z"
                fill={selectedColor.shadow}
            />

            {/* Star or Design Element */}
            <polygon
                points="50,40 55,55 70,55 58,65 63,80 50,70 37,80 42,65 30,55 45,55"
                fill="white"
            />
        </svg>
    );
};

export default Medal;
