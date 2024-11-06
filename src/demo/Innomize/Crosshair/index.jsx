export const Crosshair = () => {
    return <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '20px',
        height: '20px',
        border: '2px solid white',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none'
      }} />
}