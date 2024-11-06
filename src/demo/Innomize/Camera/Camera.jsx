import { PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { PerspectiveCamera as PerspectiveCameraType } from 'three';

import gsap from 'gsap';

const INIT = [0, 0, 0];

export const Camera = ({ position }) => {
  const { camera, controls, scene } = useThree();

  useEffect(() => {
    cameraAnimationLinear({
      camera: camera,
      position,
    });
  }, [camera, controls, scene, position]);

  useEffect(() => {
    const [x, y, z] = INIT;
    camera.position.set(x, y, z); // Set initial position
  }, []);

  return <PerspectiveCamera makeDefault fov={40} near={0.2} far={2000} />;
};

const cameraAnimationLinear = ({
  duration = 2,
  camera,
  position,
}) => {
  if (camera && position) {
    const [px, py, pz] = position;
    gsap.to(camera.position, {
      x: px,
      y: py,
      z: pz,
      duration,
      ease: 'sine.out',
    });
  }
};

