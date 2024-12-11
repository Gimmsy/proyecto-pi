import React, { useState, useEffect, useCallback, memo } from "react";

const DraggablePiece = memo(({ piece, tileSize, handleDragStart, isDropped = false }) => (
    <div
        key={piece.id}
        className={`bg-cover cursor-grab hover:opacity-70 transition-opacity 
            ${isDropped ? "border-2 border-blue-500" : ""}`}
        style={{
            width: `${tileSize}px`,
            height: `${tileSize}px`,
            backgroundImage: `url(${piece.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}
        draggable="true"
        onDragStart={(e) => {
            e.dataTransfer.setData("text/plain", JSON.stringify(piece));
            const dragImage = new Image(tileSize, tileSize);
            dragImage.src = piece.image;
            e.dataTransfer.setDragImage(dragImage, tileSize / 2, tileSize / 2);
        }}
    />
));

const ImageDivider = ({ imageUrl, rows = 3, cols = 3 }) => {
    const [availablePieces, setAvailablePieces] = useState([]);
    const [droppedPieces, setDroppedPieces] = useState(Array(rows * cols).fill(null));
    const [isComplete, setIsComplete] = useState(false);

    const createPieces = useCallback(async (imageUrl, rows, cols) => {
        return new Promise((resolve) => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = imageUrl;

            img.onload = () => {
                const piecesArray = [];
                const tileWidth = img.width / cols;
                const tileHeight = img.height / rows;

                for (let row = 0; row < rows; row++) {
                    for (let col = 0; col < cols; col++) {
                        canvas.width = tileWidth;
                        canvas.height = tileHeight;

                        ctx.drawImage(
                            img,
                            col * tileWidth,   // Origen X
                            row * tileHeight,  // Origen Y
                            tileWidth,         // Ancho de corte
                            tileHeight,        // Alto de corte
                            0, 0,              // Destino X, Y
                            tileWidth,         // Ancho de destino 
                            tileHeight         // Alto de destino
                        );

                        const dataUrl = canvas.toDataURL();
                        piecesArray.push({
                            id: `piece-${row}-${col}`,
                            image: dataUrl,
                            originalIndex: row * cols + col
                        });
                    }
                }
                resolve(piecesArray);
            };
        });
    }, []);

    useEffect(() => {
        async function loadPieces() {
            const piecesArray = await createPieces(imageUrl, rows, cols);
            setAvailablePieces(piecesArray.sort(() => Math.random() - 0.5));
        }
        loadPieces();
    }, [createPieces, imageUrl, rows, cols]);

    // Verificar si el puzzle está completo
    const checkPuzzleCompletion = useCallback(() => {
        const isCorrectlyPlaced = droppedPieces.every(
            (piece, index) => piece && piece.originalIndex === index
        );
        setIsComplete(isCorrectlyPlaced);
        return isCorrectlyPlaced;
    }, [droppedPieces]);

    // Manejar el arrastre desde piezas disponibles a recuadros
    const handleDropToGrid = useCallback((e, targetIndex) => {
        e.preventDefault();
        const droppedPiece = JSON.parse(e.dataTransfer.getData("text/plain"));

        setDroppedPieces(prev => {
            const newDropped = [...prev];
            // Solo permite colocar si el espacio está vacío
            if (!newDropped[targetIndex]) {
                newDropped[targetIndex] = droppedPiece;
                // Eliminar de piezas disponibles
                setAvailablePieces(prev => prev.filter(p => p.id !== droppedPiece.id));
            }
            return newDropped;
        });
    }, []);

    // Manejar el arrastre entre recuadros
    const handleReorderDroppedPieces = useCallback((e, targetIndex) => {
        e.preventDefault();
        const droppedPiece = JSON.parse(e.dataTransfer.getData("text/plain"));

        setDroppedPieces(prev => {
            const newDropped = [...prev];
            const sourcePieceIndex = newDropped.findIndex(p => p && p.id === droppedPiece.id);

            if (sourcePieceIndex !== -1 && sourcePieceIndex !== targetIndex) {
                // Intercambiar piezas
                [newDropped[sourcePieceIndex], newDropped[targetIndex]] =
                    [newDropped[targetIndex], newDropped[sourcePieceIndex]];
            }

            return newDropped;
        });

        checkPuzzleCompletion();
    }, [checkPuzzleCompletion]);

    const resetPuzzle = useCallback(() => {
        createPieces(imageUrl, rows, cols).then(piecesArray => {
            setAvailablePieces(piecesArray.sort(() => Math.random() - 0.5));
            setDroppedPieces(Array(rows * cols).fill(null));
            setIsComplete(false);
        });
    }, [createPieces, imageUrl, rows, cols]);

    const tileSize = 300 / rows;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="flex space-x-4">
                {/* Piezas disponibles */}
                <div
                    className="grid gap-2"
                    style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, ${tileSize}px))` }}
                >
                    {availablePieces.map((piece) => (
                        <DraggablePiece
                            key={piece.id}
                            piece={piece}
                            tileSize={tileSize}
                            handleDragStart={(e, p) => {
                                e.dataTransfer.setData("text/plain", JSON.stringify(p));
                            }}
                        />
                    ))}
                </div>

                {/* Área de colocación */}
                <div
                    className="grid gap-2 bg-gray-100"
                    style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, ${tileSize}px))` }}
                >
                    {droppedPieces.map((piece, index) => (
                        <div
                            key={index}
                            className={`bg-gray-300 border-2 border-gray-400 flex items-center justify-center 
                            ${piece && piece.originalIndex === index ? "bg-green-200" : ""}`}
                            style={{
                                width: `${tileSize}px`,
                                height: `${tileSize}px`
                            }}
                            onDrop={(e) =>
                                piece
                                    ? handleReorderDroppedPieces(e, index)
                                    : handleDropToGrid(e, index)
                            }
                            onDragOver={(e) => e.preventDefault()}
                        >
                            {piece && (
                                <DraggablePiece
                                    piece={piece}
                                    tileSize={tileSize}
                                    isDropped={true}
                                    handleDragStart={(e) => {
                                        e.dataTransfer.setData("text/plain", JSON.stringify(piece));
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={resetPuzzle}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-700"
            >
                Reiniciar Puzzle
            </button>

            {isComplete && (
                <div className="mt-4 text-green-600 font-bold">
                    ¡Puzzle completado correctamente!
                </div>
            )}

            <div className="mt-4 text-sm text-gray-600">
                Progreso: {droppedPieces.filter(p => p).length} / {rows * cols} piezas
            </div>
        </div>
    );
};

export default ImageDivider;