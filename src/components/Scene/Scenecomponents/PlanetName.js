import { React, useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";
import { Text } from "@react-three/drei";

extend({ TextGeometry });

//https://github.com/mrdoob/three.js/blob/master/examples/webgl_buffergeometry_instancing_billboards.html

function PlanetName(props) {
  const font = new FontLoader().parse(helvetiker);

  return (
    <>
      <textGeometry args={[props.name, { font, size: 0.06, height: 0.01 }]} />
      <meshLambertMaterial attach="material" color={"white"} />
    </>
  );
}

export default PlanetName;
