import "./Scene.scss";
import { Canvas } from "@react-three/fiber";
import { Stars, Stats } from "@react-three/drei";
//import { PointerLockControls } from '@react-three/drei'   Leave this commented out for now, will use orbit controls for setting up scene
import { OrbitControls } from "@react-three/drei";
import Map from "./Scenecomponents/Map";
import { convertAllSexagesimalToDec } from "./conversionsHelper";
import defaultPlanetData from "./ExoplanetHelper";
import { useQuery, gql } from '@apollo/client';



function Scene(props) {
  const GET_PLANETS = gql`
  query GetPlanets {
    planets {
      name
      disposition
      rightAscension
      declination
      distance
    }
  }
`;

  const { loading, error, data } = useQuery(GET_PLANETS)

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
        {loading
          ? <p>Loading...</p>
          : error
            ? <p>Error : {error.message}</p>
            : <Map 
                data={data 
                  ? convertAllSexagesimalToDec(data) 
                  : defaultPlanetData} 
                planetSelected={props.planetSelected} />}
        {/*<Stats />*/}
      </Canvas>
    </div>
  );
}

export default Scene;
