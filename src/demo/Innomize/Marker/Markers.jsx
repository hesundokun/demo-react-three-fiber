

const MAKERS = [
[
  2.3913186685657486,
  -1,
  11.02678799806608
],
[
  4.907270086664998,
  -1,
  3.9377751948213993
],
[
  -4.629305628815825,
  -1,
  10.519685741356458
]
]

function Marker({ position }) {
  return (
    <mesh position={position} >
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshBasicMaterial color="red" />
    </mesh>
  );
}


export function Markers() {
  const markerPositions = MAKERS;


  return (
    <>
      {markerPositions.map((position, index) => (
        <Marker
          key={index}
          position={position}
        />
      ))}
    </>
  );
}