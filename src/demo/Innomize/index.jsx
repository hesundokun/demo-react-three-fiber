import {Canvas} from "@react-three/fiber";
import {Model} from "./Model";
import {Control} from "./Control";
import {useState, useCallback} from "react";
import {Markers} from "./Marker";
import {Crosshair} from "./Crosshair";
import {CenterRaycaster} from "./CenterRaycaster";
import {Camera} from "./Camera/Camera";

export const Innomize = () => {
    const [cameraPosition, setCameraPosition] = useState([0, 0, 0]);

    const handleCenterClick = useCallback((newPosition) => {
        setCameraPosition([newPosition.x, newPosition.y, newPosition.z]);
    }, []);

    return (
        <>
            <Canvas>
                <Camera position={cameraPosition} />
                <Control />
                <ambientLight intensity={Math.PI / 2} />
                <Model />
                <Markers />
                <CenterRaycaster onClick={handleCenterClick} />
            </Canvas>
            <Crosshair />
        </>
    );
};
