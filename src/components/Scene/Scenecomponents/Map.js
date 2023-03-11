import { React, useEffect, useRef, useState, useMemo } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { Instances } from "@react-three/drei";
import * as THREE from "three";
import Planet from "./Planet";
import PlanetName from "./PlanetName";
import { Billboard, Text } from "@react-three/drei";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";
extend({ TextGeometry });
/*https://codesandbox.io/s/floating-instanced-shoes-h8o2d*/
//Converting from celestial coordinates to cartesian coordinates
//https://math.stackexchange.com/questions/2196866/how-to-calculate-spherical-coordinate-x-y-z-of-a-star-from-magnitude-declin
//http://faraday.uwyo.edu/~admyers/ASTR5160/handouts/51605.pdf

const planetObject = new THREE.Object3D();
const nameObject = new THREE.Object3D();

function Map({ data }) {
  const numPlanets = data.length;
  const ref1 = useRef();
  const ref2 = useRef();

  useFrame(({ camera }) => {
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
      nameObject.quaternion.copy(camera.quaternion);
      nameObject.position.set(x, y + 0.2, z);
      nameObject.updateMatrix();
      ref2.current.setMatrixAt(count, nameObject.matrix);
    }
    ref2.current.instanceMatrix.needsUpdate = true;
  });

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
      nameObject.position.set(x, y + 0.2, z);
      planetObject.updateMatrix();
      nameObject.updateMatrix();
      ref1.current.setMatrixAt(count, planetObject.matrix);
      ref2.current.setMatrixAt(count, nameObject.matrix);
    }
    // Update the instance
    ref1.current.instanceMatrix.needsUpdate = true;
    ref2.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <>
      <instancedMesh ref={ref1} args={[null, null, numPlanets]}>
        {data.map((props, i) => (
          <Planet key={i} {...props} />
        ))}
      </instancedMesh>
      <instancedMesh ref={ref2} args={[null, null, numPlanets]}>
        {data.map((props, i) => (
          <PlanetName key={i} {...props} />
        ))}
      </instancedMesh>
    </>
  );
}

export default Map;
