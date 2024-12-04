
import { Html } from "@react-three/drei";
import { useCallback, useState, useRef } from "react";


const Video = () => {
    const videoRef = useRef(null); // Referencia al video
    const [isPaused, setIsPaused] = useState(false); // Estado para manejar reproducción

    const handleVideoToggle = useCallback(() => {
        if (videoRef.current) {
            if (isPaused) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
            setIsPaused(!isPaused);
        }
    }, [isPaused]);


    return (
        <Html position="absolute" style={{ pointerEvents: "none" }}>
            <div style={{
                transform: "translate(25%, 145%)",
                top: "20%",
                left: "10%",
                zIndex: 1000,
                width: "1500px", // Ajusta el tamaño según necesites
                height: "auto",
                cursor: "pointer",
                textAlign: "center",
                background: "rgba(0, 0, 0, 0.5)", // Fondo para visibilidad
                padding: "10px",
                borderRadius: "8px"
            }}
                onClick={handleVideoToggle}>

                <video
                    ref={videoRef}
                    src="/assets/videos/video_water2.mp4"
                    muted
                    loop
                    autoPlay
                    style={{ width: "100%", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}
                />
                <p style={{ marginTop: "10px", color: "white", fontSize: "14px" }}>
                    {isPaused ? "Reproducir" : "Pausar"} el video (Click)
                </p>
            </div>
        </Html>
    );
};


export default Video;
