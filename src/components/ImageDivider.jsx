import React, { useState, useEffect } from 'react';

const ImageDivider = ({ imageUrl, rows = 3, cols = 3 }) => {
    const [pieces, setPieces] = useState([]);
    const [originalPieces, setOriginalPieces] = useState([]);
    const [droppedPieces, setDroppedPieces] = useState(Array(rows * cols).fill(null));
    const [isComplete, setIsComplete] = useState(false);

    // Divide la imagen en piezas
    useEffect(() => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = imageUrl;

        img.onload = () => {
            const imgWidth = img.width;
            const imgHeight = img.height;
            const tileWidth = imgWidth / cols;
            const tileHeight = imgHeight / rows;

            let piecesArray = [];
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    canvas.width = tileWidth;
                    canvas.height = tileHeight;
                    ctx.clearRect(0, 0, tileWidth, tileHeight);
                    ctx.drawImage(
                        img,
                        col * tileWidth, row * tileHeight,
                        tileWidth, tileHeight,
                        0, 0, tileWidth, tileHeight
                    );
                    const dataUrl = canvas.toDataURL();
                    piecesArray.push({
                        id: `piece-${row}-${col}`,
                        image: dataUrl,
                        originalIndex: row * cols + col
                    });
                }
            }

            // Mezclar piezas aleatoriamente
            const shuffledPieces = [...piecesArray].sort(() => Math.random() - 0.5);
            setPieces(shuffledPieces);
            setOriginalPieces(piecesArray);
        };
    }, [imageUrl, rows, cols]);

    // Manejar el inicio del arrastre
    const handleDragStart = (e, piece) => {
        e.dataTransfer.setData('text/plain', JSON.stringify(piece));
    };

    // Permitir soltar
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // Manejar soltar una pieza
    const handleDrop = (e, targetIndex) => {
        e.preventDefault();
        const droppedPieceData = e.dataTransfer.getData('text/plain');
        const droppedPiece = JSON.parse(droppedPieceData);

        const newDroppedPieces = [...droppedPieces];
        const newPieces = [...pieces];

        // Verificar si el espacio está vacío
        if (newDroppedPieces[targetIndex] === null) {
            // Quitar la pieza de su posición original
            const sourceIndex = newDroppedPieces.findIndex(piece => piece && piece.id === droppedPiece.id);
            if (sourceIndex !== -1) {
                newDroppedPieces[sourceIndex] = null;
            }

            // Colocar la pieza en la nueva posición
            newDroppedPieces[targetIndex] = droppedPiece;

            setDroppedPieces(newDroppedPieces);

            // Verificar si el rompecabezas está completo
            const isComplete = newDroppedPieces.every((piece, index) =>
                piece && piece.originalIndex === index
            );
            setIsComplete(isComplete);
        }
    };

    // Reiniciar el rompecabezas
    const resetPuzzle = () => {
        // Mezclar piezas nuevamente
        const shuffledPieces = [...originalPieces].sort(() => Math.random() - 0.5);
        setPieces(shuffledPieces);
        setDroppedPieces(Array(rows * cols).fill(null));
        setIsComplete(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex space-x-4">
                {/* Piezas arrastrables */}
                <div className="grid grid-cols-3 gap-2 w-[300px]">
                    {pieces.map((piece) => (
                        <div
                            key={piece.id}
                            className={`w-[100px] h-[100px] bg-cover cursor-grab 
                ${!droppedPieces.includes(piece) ? 'block' : 'hidden'}`}
                            style={{ backgroundImage: `url(${piece.image})` }}
                            draggable="true"
                            onDragStart={(e) => handleDragStart(e, piece)}
                        />
                    ))}
                </div>

                {/* Área de colocación */}
                <div
                    className="grid grid-cols-3 gap-2 w-[300px]"
                    onDragOver={handleDragOver}
                >
                    {droppedPieces.map((piece, index) => (
                        <div
                            key={index}
                            className="w-[100px] h-[100px] bg-gray-200 border-2 border-gray-400"
                            onDrop={(e) => handleDrop(e, index)}
                            onDragOver={handleDragOver}
                        >
                            {piece && (
                                <div
                                    className="w-full h-full bg-cover"
                                    style={{ backgroundImage: `url(${piece.image})` }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Botón de reinicio */}
            <button
                onClick={resetPuzzle}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Reiniciar Puzzle
            </button>

            {/* Mensaje de victoria */}
            {isComplete && (
                <div className="mt-4 text-green-600 font-bold">
                    ¡Puzzle completado!
                </div>
            )}
        </div>
    );
};

export default ImageDivider;