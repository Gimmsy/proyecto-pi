import { Environment } from "@react-three/drei";

const Staging = () => {
    return (
        <>
            <Environment
            ground={{
                height: 20,
                radius: 70,
                scale: 0,
            }}
            files={"/hdris/sky/sky_2k.hdr"}
            background={"true"}
            />
        </>
    );
};

export default Staging;