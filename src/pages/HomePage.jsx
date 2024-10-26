import React from "react";
import Card from "../components/Card";
import "../styles/HomePage.css";

const HomePage = () => {
    return (
        <div className="home-container">
            <header className="hero-section">
                <div className="overlay">
                    <h1 className="hero-title">Bienvenido a Nuestro Mundo: Explorando los Problemas Ambientales</h1>
                </div>
            </header>
            <section className="cards-section">
                <Card
                    title="Contaminación del agua"
                    description="Breve descripción o algo llamativo para llamar la atención"
                    imageUrl="/assets/image/contaminacion-agua.jpg"
                    buttonLabel="Ver más"
                />
                <Card
                    title="Escasez del agua"
                    description="Breve descripción del tema"
                    imageUrl="/assets/image/escasez-agua.jpg"
                    buttonLabel="Ver más"
                />
                <Card
                    title="Acidificación de los océanos"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    imageUrl="/assets/image/acidificacion-oceanos.jpg"
                    buttonLabel="Ver más"
                />
            </section>
        </div>
    );
};

export default HomePage;
