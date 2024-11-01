import { Html, Text3D } from "@react-three/drei"


const Welcometext = () => {

    

    return (
        <>
            <Text3D
                position={[-10, -3, 0]}
                font={"/public/assets/fonts/baby-bear.json"}
                bevelEnabled
                bevelSize={0.003}
                bevelThickness={0.01}
                height={0.05}
                lineHeight={0.002}
                letterSpacing={0.1}
                size={0.9}
            >
                EXPLORANDO LOS PROBLEMAS AMBIENTALES
                <meshNormalMaterial />
            </Text3D>
            <Html
                occlude
                wrapperClass="welcome-text"
                center
                distanceFactor={5.5}
            >
                <h1> BIENVENIDOS A NUESTRO MUNDO </h1>
            </Html>
        </>
    )
}

export default Welcometext;