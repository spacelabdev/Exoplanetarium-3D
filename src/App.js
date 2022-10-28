import './App.css';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Exoplanetarium 3D
        </p>
      </header>
      <div id="canvas-wrap">
          <Canvas>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          </Canvas>
      </div>
    </div>
  );
}

export default App;
