import "./Scene.scss";
import { Canvas } from "@react-three/fiber";
import { Stars, Stats } from "@react-three/drei";
//import { PointerLockControls } from '@react-three/drei'   Leave this commented out for now, will use orbit controls for setting up scene
import { OrbitControls } from "@react-three/drei";
import Map from "./Scenecomponents/Map";
import planetdata from "./ExoplanetHelper";

function Scene(props) {
  return (
    <div id="canvas-wrap">
      <Canvas>
        <color attach="background" args={["#000000"]} />
        {/*<PointerLockControls />*/}
        <hemisphereLight />
        <OrbitControls />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <Map data={planetdata} planetSelected={props.planetSelected} />
        {/*<Stats />*/}
      </Canvas>
    </div>
  );
}

export default Scene;
