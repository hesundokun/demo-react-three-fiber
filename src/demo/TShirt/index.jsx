import {Canvas, useFrame} from "@react-three/fiber";
import {useRef} from "react";
import {useGLTF, useTexture, AccumulativeShadows, RandomizedLight, Decal, Environment, Center} from "@react-three/drei";
import {easing} from "maath";
import {useSnapshot, proxy} from "valtio";
import {Logo} from "@pmndrs/branding";
import {motion, AnimatePresence} from "framer-motion";
import {AiFillCamera, AiOutlineArrowLeft, AiOutlineHighlight, AiOutlineShopping} from "react-icons/ai";

import "./TShirt.scss";

export const TShirt = () => {
    return (
        <div className="tshirt">
            <Canvas shadows camera={{position: [0, 0, 2.5], fov: 25}} gl={{preserveDrawingBuffer: true}}>
                <ambientLight intensity={0.5 * Math.PI} />
                <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
                <CameraRig>
                    <Backdrop />
                    <Center>
                        <Shirt />
                    </Center>
                </CameraRig>
            </Canvas>
            <Overlay />
        </div>
    );
};

function Backdrop() {
    const shadows = useRef();
    useFrame((state, delta) => easing.dampC(shadows.current.getMesh().material.color, state.color, 0.25, delta));
    return (
        <AccumulativeShadows
            ref={shadows}
            temporal
            frames={60}
            alphaTest={0.85}
            scale={5}
            resolution={2048}
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, 0, -0.14]}
        >
            <RandomizedLight amount={4} radius={9} intensity={0.55 * Math.PI} ambient={0.25} position={[5, 5, -10]} />
            <RandomizedLight amount={4} radius={5} intensity={0.25 * Math.PI} ambient={0.55} position={[-5, 5, -9]} />
        </AccumulativeShadows>
    );
}

const state = proxy({
    intro: true,
    colors: ["#ccc", "#EFBD4E", "#80C670", "#726DE8", "#EF674E", "#353934"],
    decals: ["react", "three2", "pmndrs"],
    color: "#EFBD4E",
    decal: "three2",
});

function CameraRig({children}) {
    const group = useRef();
    const snap = useSnapshot(state);
    useFrame((state, delta) => {
        easing.damp3(state.camera.position, [snap.intro ? -state.viewport.width / 4 : 0, 0, 2], 0.25, delta);
        easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta);
    });
    return <group ref={group}>{children}</group>;
}

function Shirt(props) {
    const snap = useSnapshot(state);
    const texture = useTexture(`/${snap.decal}.png`);
    const {nodes, materials} = useGLTF("/shirt_baked_collapsed.glb");
    useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));
    return (
        <mesh
            castShadow
            geometry={nodes.T_Shirt_male.geometry}
            material={materials.lambert1}
            material-roughness={1}
            {...props}
            dispose={null}
        >
            <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} map={texture} />
        </mesh>
    );
}

function Overlay() {
    const snap = useSnapshot(state);
    const transition = {type: "spring", duration: 0.8};
    const config = {
        initial: {x: -100, opacity: 0, transition: {...transition, delay: 0.5}},
        animate: {x: 0, opacity: 1, transition: {...transition, delay: 0}},
        exit: {x: -100, opacity: 0, transition: {...transition, delay: 0}},
    };
    return (
        <div style={{position: "absolute", top: "20px", left: 0, width: "100%", height: "100%"}}>
            <motion.header initial={{opacity: 0, y: -100}} animate={{opacity: 1, y: 0}} transition={transition}>
                <Logo width="40" height="40" />
                <motion.div animate={{x: snap.intro ? 0 : 100, opacity: snap.intro ? 1 : 0}} transition={transition}>
                    <AiOutlineShopping size="3em" />
                </motion.div>
            </motion.header>
            <AnimatePresence>
                {snap.intro ? (
                    <motion.section key="main" {...config}>
                        <div className="section--container">
                            <motion.div
                                key="title"
                                initial={{x: 100, opacity: 0}}
                                animate={{x: 0, opacity: 1}}
                                transition={{
                                    type: "spring",
                                    damping: 5,
                                    stiffness: 40,
                                    restDelta: 0.001,
                                    duration: 0.3,
                                }}
                            >
                                <h1>LET'S DO IT.</h1>
                            </motion.div>
                            <div className="support--content">
                                <motion.div
                                    key="p"
                                    initial={{y: 100, opacity: 0}}
                                    animate={{y: 0, opacity: 1}}
                                    transition={{
                                        type: "spring",
                                        damping: 7,
                                        stiffness: 30,
                                        restDelta: 0.001,
                                        duration: 0.6,
                                        delay: 0.2,
                                        delayChildren: 0.2,
                                    }}
                                >
                                    <p>
                                        Create your unique and exclusive shirt with our brand-new 3D customization tool.{" "}
                                        <strong>Unleash your imagination</strong> and define your own style.
                                    </p>
                                    <button style={{background: snap.color}} onClick={() => (state.intro = false)}>
                                        CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.section>
                ) : (
                    <motion.section key="custom" {...config}>
                        <Customizer />
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}

function Customizer() {
    const snap = useSnapshot(state);
    return (
        <div className="customizer">
            <div className="color-options">
                {snap.colors.map((color) => (
                    <div
                        key={color}
                        className={`circle`}
                        style={{background: color}}
                        onClick={() => (state.color = color)}
                    ></div>
                ))}
            </div>
            <div className="decals">
                <div className="decals--container">
                    {snap.decals.map((decal) => (
                        <div key={decal} className={`decal`} onClick={() => (state.decal = decal)}>
                            <img src={decal + "_thumb.png"} alt="brand" />
                        </div>
                    ))}
                </div>
            </div>
            <button
                className="share"
                style={{background: snap.color}}
                onClick={() => {
                    const link = document.createElement("a");
                    link.setAttribute("download", "canvas.png");
                    link.setAttribute(
                        "href",
                        document
                        .querySelector("canvas")
                        .toDataURL("image/png")
                        .replace("image/png", "image/octet-stream")
                    );
                    link.click();
                }}
            >
                DOWNLOAD
                <AiFillCamera size="1.3em" />
            </button>
            <button className="exit" style={{background: snap.color}} onClick={() => (state.intro = true)}>
                GO BACK
                <AiOutlineArrowLeft size="1.3em" />
            </button>
        </div>
    );
}

useGLTF.preload("/shirt_baked_collapsed.glb");
["/react.png", "/three2.png", "/pmndrs.png"].forEach(useTexture.preload);
