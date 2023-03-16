import { React, useRef } from "react";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";
import { Instance } from "@react-three/drei";

extend({ TextGeometry });

const font = new FontLoader().parse(helvetiker);

//https://github.com/mrdoob/three.js/blob/master/examples/webgl_buffergeometry_instancing_billboards.html

/* Do Not Delete anything inside of PlanetName */

function PlanetName({ id, object, temp = new THREE.Object3D(), ...props }) {
  const ref = useRef();

  useFrame(({ camera }) => {
    if (!ref.current) return;
    const x =
      props.distance *
      Math.cos(props.declination) *
      Math.cos(props.rightAscension);
    const y =
      props.distance *
      Math.cos(props.declination) *
      Math.sin(props.rightAscension);
    const z = props.distance * Math.sin(props.declination);

    ref.current.position.set(x - 0.3, y + 0.2, z);
    ref.current.quaternion.copy(camera.quaternion);
  });

  return (
    <group {...props}>
      <Instance ref={ref}>
        <mesh>
          <textGeometry
            args={[props.name, { font, size: 0.06, height: 0.001 }]}
          />
          <meshLambertMaterial color={"white"} />
        </mesh>
      </Instance>
    </group>
  );
}

export default PlanetName;
