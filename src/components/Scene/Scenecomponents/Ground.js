import { React, useRef, useState, useEffect } from "react";
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

const Ground = ({ moveCameraTo }) => {

    useEffect(()=>{
        moveCameraTo(0,0,0)
    }, [])

  return (
    <>
      
    </>
  );
}

export default Ground;
