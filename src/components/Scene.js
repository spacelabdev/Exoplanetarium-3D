import './Scene.css';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { PointerLockControls } from '@react-three/drei'

function Scene() {
  return (
    <div id="canvas-wrap">
        <Canvas>
          <color attach="background" args={['#000000']} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <PointerLockControls />
        </Canvas>
    </div>
  )
};

export default  Scene;