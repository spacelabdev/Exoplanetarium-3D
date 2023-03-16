import { React, useEffect, useRef } from "react";
import { extend } from "@react-three/fiber";
import { Instances } from "@react-three/drei";
import * as THREE from "three";
import Planet from "./Planet";
import PlanetName from "./PlanetName";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
extend({ TextGeometry });

/*https://codesandbox.io/s/floating-instanced-shoes-h8o2d*/
//Converting from celestial coordinates to cartesian coordinates
//https://math.stackexchange.com/questions/2196866/how-to-calculate-spherical-coordinate-x-y-z-of-a-star-from-magnitude-declin
//http://faraday.uwyo.edu/~admyers/ASTR5160/handouts/51605.pdf

const planetObject = new THREE.Object3D();
const font = new FontLoader().parse(helvetiker);

function Map({ data }) {
  const numPlanets = data.length;
  const ref1 = useRef();

  useEffect(() => {
    let count = 0;
    for (let d = 0; d < numPlanets; ++d) {
      ++count;
      const x =
        data[d].distance *
        Math.cos(data[d].declination) *
        Math.cos(data[d].rightAscension);
      const y =
        data[d].distance *
        Math.cos(data[d].declination) *
        Math.sin(data[d].rightAscension);
      const z = data[d].distance * Math.sin(data[d].declination);
      planetObject.position.set(x, y, z);
      planetObject.updateMatrix();
      ref1.current.setMatrixAt(count, planetObject.matrix);
    }
    // Update the instance
    ref1.current.instanceMatrix.needsUpdate = true;
  }, [data, numPlanets]);

  return (
    <>
      <instancedMesh ref={ref1} args={[null, null, numPlanets]}>
        {data.map((props, i) => (
          <Planet key={i} {...props} />
        ))}
      </instancedMesh>

      {/* Do Not Delete anything inside of Instances */}
      <Instances
        limit={numPlanets} // Optional: max amount of items (for calculating buffer size)
        range={1000} // Optional: draw-range
      >
        <textGeometry args={["", { font, size: 0.06, height: 0.001 }]} />
        <meshLambertMaterial color={"white"} />
        {data.map((props, i) => (
          <PlanetName key={i} id={i} {...props} />
        ))}
      </Instances>
    </>
  );
}

export default Map;
