import React from "react";
import Card from "../components/Card";
import Sliderbar from "../components/Slidebar";
import { Canvas } from "@react-three/fiber";
import WelcomeText from "../components/WelcomeText";
import OceanBackground from "../components/OceanBackground";
import { Loader } from "@react-three/drei";

const HomePage = () => {
  return (
    <div className="home-container text-center font-sans min-h-screen pt-20">
      <Sliderbar />
      <OceanBackground />
      <Canvas>
        <WelcomeText />
      </Canvas>
      <section className="cards-section flex flex-wrap justify-center gap-4 p-8 md:flex-row">
        <Card
          title="Contaminación del agua"
          description="El agua, fuente de vida, ahora enfrenta un enemigo invisible y devastador. 
                      Descubre cómo nuestros océanos y ríos luchan cada día contra la contaminación 
                      y por qué todos somos parte de la solución."
          imageUrl="/assets/image/contaminacion-agua.jpg"
          buttonLabel="Ver más"
        />
        <Card
          title="Escasez del agua"
          description="Imagina un mundo donde cada gota cuenta. La escasez de agua ya es una 
                      realidad en muchos lugares. 
                      Aprende cómo este recurso vital se está agotando y qué podemos hacer para preservarlo."
          imageUrl="/assets/image/escasez-agua.jpg"
          buttonLabel="Ver más"
        />
        <Card
          title="Acidificación de los océanos"
          description="Nuestros mares están cambiando, y no es para mejor. La acidificación amenaza la vida marina, alterando ecosistemas enteros. 
                      Aprende cómo y por qué esto nos afecta a todos."
          imageUrl="/assets/image/acidificacion-oceanos.jpg"
          buttonLabel="Ver más"
        />
      </section>
      <Loader/>
    </div>
  );
};

export default HomePage;