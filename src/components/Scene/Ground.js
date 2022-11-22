import * as THREE from 'three';

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0,-10,0]}>
        <meshBasicMaterial color="green" opacity={0.2} transparent side={THREE.DoubleSide}/>
        <circleGeometry args={[300,20]} />
    </mesh>
  )
};

export default Ground;