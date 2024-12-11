import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import Staging from "../components/Staging";
import Sidebar from "../components/Slidebar";
import useAuthStore from '../store/use-auth-store';
import ImageDivider from '../components/ImageDivider';

const Trivia = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        // Redirigir a login si no hay usuario
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    // Si no hay usuario, no renderizar nada
    if (!user) return null;

    return (
        <>
            <Sidebar />
            <div className="w-screen h-screen">
                <Canvas
                    className="canvas-3d-container w-full h-full"
                    camera={{ position: [0, 0, 25], fov: 75 }}
                    shadows
                >
                    <Staging />
                </Canvas>
            </div>

            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
                <ImageDivider
                    imageUrl="/assets/image/puzzle.jpg"
                    rows={3}
                    cols={3}
                    difficulty="medium"
                />
            </div>

            <Loader />
        </>
    );
};

export default Trivia;