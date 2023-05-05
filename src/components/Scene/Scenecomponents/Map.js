import { React, useRef, useState } from "react";
import { extend, useThree, useFrame } from "@react-three/fiber";
import * as THREE from 'three'
import { Instances } from "@react-three/drei";
import Planet from "./Planet";
import Sun from "./Sun";
import PlanetName from "./PlanetName";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
extend({ TextGeometry });


/*https://codesandbox.io/s/floating-instanced-shoes-h8o2d*/
//Converting from celestial coordinates to cartesian coordinates
//https://math.stackexchange.com/questions/2196866/how-to-calculate-spherical-coordinate-x-y-z-of-a-star-from-magnitude-declin
//http://faraday.uwyo.edu/~admyers/ASTR5160/handouts/51605.pdf

const font = new FontLoader().parse(helvetiker);

function Map({ planetSelected, data }) {
  const numPlanets = data.length;
  const [camera, setCamera] = useState(useThree((state) => state.camera))
  const [originCameraLocation, setOriginCameraLocation] = useState(new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z))

  let ref = useRef(camera)

  let cameraMovePosition = new THREE.Vector3();

  useFrame((state, delta) => {
    console.log("Origin camera position: ", originCameraLocation)
    console.log("camera position: ", state.camera.position)
    state.camera.position.lerp(cameraMovePosition.set(originCameraLocation.x, originCameraLocation.y, originCameraLocation.z), .01)
    state.camera.lookAt(0, 0, 0)
    state.camera.updateProjectionMatrix()
})

  return (
    <>
      <Sun position={[0, 0, 0]} />
      <Instances limit={numPlanets} range={1000}>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshLambertMaterial color="purple" />
        {data.map((planet, i) => { return (
          <Planet
            key={i}
            data={data}
            texture={planet.texture}
            numPlanets={numPlanets}
            planetSelected={planetSelected}
            {...planet}
          />
        )})}
      </Instances>

      <Instances limit={numPlanets} range={1000}>
        <textGeometry args={["", { font, size: 0.06, height: 0.001 }]} />
        <meshLambertMaterial color={"white"} />
        {data.map((planet, i) => (
          <PlanetName key={i} id={i} {...planet} />
        ))}
      </Instances>
    </>
  );
}

export default Map;
