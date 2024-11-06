import { PointerLockControls } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';


const velocity = new Vector3();
const direction = new Vector3();

export const Control = () => {
  const controlRef = useRef(null);
  const [moveForward, setMoveForward] = useState(false);
  const [moveBackward, setMoveBackward] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  const [canJump, setCanJump] = useState(true);

  useEffect(() => {
    const onKeyDown = (event) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          setMoveForward(true);
          break;

        case 'ArrowLeft':
        case 'KeyA':
          setMoveLeft(true);
          break;

        case 'ArrowDown':
        case 'KeyS':
          setMoveBackward(true);
          break;

        case 'ArrowRight':
        case 'KeyD':
          setMoveRight(true);
          break;

        case 'Space':
          if (canJump) velocity.y += 3;
          setCanJump(false);
          break;
      }
    };

    const onKeyUp = (event) => {
      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          setMoveForward(false);
          break;

        case 'ArrowLeft':
        case 'KeyA':
          setMoveLeft(false);
          break;

        case 'ArrowDown':
        case 'KeyS':
          setMoveBackward(false);
          break;

        case 'ArrowRight':
        case 'KeyD':
          setMoveRight(false);
          break;
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
  }, []);

  useFrame((state, delta, xrFrame) => {
    if (controlRef.current && controlRef.current.isLocked) {


      velocity.x -= velocity.x * 20.0 * delta; //độ nhạy/ tốc độ di chuyển
      velocity.z -= velocity.z * 20.0 * delta;

      velocity.y -= 9.8 * 1 * delta; // 9.8: gia tốc trọng lực, vật 1kg

      direction.z = Number(moveForward) - Number(moveBackward);
      direction.x = Number(moveRight) - Number(moveLeft);
      direction.normalize();

      if (moveForward || moveBackward)
        velocity.z -= direction.z * 40.0 * delta; // tốc độ
      if (moveLeft || moveRight) velocity.x -= direction.x * 40.0 * delta;
      controlRef.current.moveRight(-velocity.x * delta);
      controlRef.current.moveForward(-velocity.z * delta);

      controlRef.current.getObject().position.y += velocity.y * delta ;

      if (controlRef.current.getObject().position.y < 0.5) {
        velocity.y = 0;
        controlRef.current.getObject().position.y = 0.5;
        setCanJump(true);
      }
    }
  });

  useEffect(() => {
    if(controlRef) {
      console.log(controlRef.current);
    }
  }, [controlRef]);

  return <PointerLockControls ref={controlRef} makeDefault />;
};
