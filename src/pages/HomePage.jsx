import React from "react";
import Card from "../components/Card";
import "../styles/HomePage.css";
import Sliderbar from "../components/Slidebar";
import { Canvas } from "@react-three/fiber";
import Welcometext from "../components/WelcomeText";

const HomePage = () => {
    return (
        <>
            <Sliderbar />
            <Canvas>
                <Welcometext />
            </Canvas>
            <section className="cards-section">
                <Card
                    title="Contaminación del agua"
                    description="Breve descripción o algo llamativo para llamar la atención"
                    imageUrl="/assets/image/contaminacion-agua.jpg"
                    buttonLabel="Ver más" />
                <Card
                    title="Escasez del agua"
                    description="Breve descripción del tema"
                    imageUrl="/assets/image/escasez-agua.jpg"
                    buttonLabel="Ver más" />
                <Card
                    title="Acidificación de los océanos"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    imageUrl="/assets/image/acidificacion-oceanos.jpg"
                    buttonLabel="Ver más" />
            </section>
        </>
    );
};

export default HomePage;
