import {Canvas, useFrame} from "@react-three/fiber";
import {useRef} from "react";

const BoxMesh = () => {
    const meshRef = useRef();
    useFrame((_, delta) => (meshRef.current.rotation.x += delta));

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"blue"} />
        </mesh>
    );
};

export const Box = () => {
    return (
        <Canvas style={{height: "100vh", width: "100vw"}}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <BoxMesh />
        </Canvas>
    );
};
