import { useVideoTexture } from "@react-three/drei";

const Video = (props) => {
    const texture = useVideoTexture("/assets/videos/video_water2.mp4", {
        muted: true,
        loop: true,
        start: true,
    });

    console.log("Video texture loaded:", texture);

    if (!texture) {
        return null; // Espera a que la textura se cargue
    }

    return (
        <mesh {...props}>
            <planeGeometry args={[2, 1]} />
            <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
    );
};

export default Video;
