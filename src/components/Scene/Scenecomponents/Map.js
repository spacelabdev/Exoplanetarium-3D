import { React, useRef, useState, useEffect } from "react";
import { extend, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
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

const Map = ({data, selectedPlanet, planetSelected, starPosition, moveTargetTo, moveCameraTo, swapPerspective }) => {
  const numPlanets = data.length;

  return (
    <>
      <Sun 
        position={[0, 0, 0]} 
        leftClickFunction={() => {return moveTargetTo(0, 0, 0)}} 
        rightClickFunction={swapPerspective}/>
      {/* {selectedPlanet
        ? <Sun position={[starPosition[0], starPosition[1], starPosition[2]]} />
        : null
      } */}
      <Instances limit={numPlanets} range={1000}>
        <sphereGeometry args={[0.001, 3, 2]} />
        <meshLambertMaterial 
          color="white"
          wireframe={false}
          transparent={true}
          opacity={0.0} />
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
};

export default Map;
