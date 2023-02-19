import { React, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Instances } from "@react-three/drei";
import * as THREE from "three";
import Planet from "./Planet";

/*https://codesandbox.io/s/floating-instanced-shoes-h8o2d*/
//Converting from celestial coordinates to cartesian coordinates
//https://math.stackexchange.com/questions/2196866/how-to-calculate-spherical-coordinate-x-y-z-of-a-star-from-magnitude-declin
//http://faraday.uwyo.edu/~admyers/ASTR5160/handouts/51605.pdf

const planetObject = new THREE.Object3D();

function Map({ data }) {
  const numPlanets = data.length;
  const ref = useRef();
  useEffect(() => {
    // Set positions
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
      ref.current.setMatrixAt(count, planetObject.matrix);
    }
    // Update the instance
    ref.current.instanceMatrix.needsUpdate = true;
  }, []);
  return (
    <instancedMesh ref={ref} args={[null, null, numPlanets]}>
      {data.map((props, i) => (
        <Planet key={i} {...props} />
      ))}
    </instancedMesh>
  );
}

export default Map;
