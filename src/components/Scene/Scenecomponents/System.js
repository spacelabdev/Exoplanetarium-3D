import { React, useEffect, useRef, useState } from "react";
import { extend, Canvas, useFrame, useThree } from "@react-three/fiber";
import { CameraControls } from '@react-three/drei'
import * as THREE from 'three'
import Sun from "./Sun";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
extend({ TextGeometry });


/*https://codesandbox.io/s/floating-instanced-shoes-h8o2d*/
//Converting from celestial coordinates to cartesian coordinates
//https://math.stackexchange.com/questions/2196866/how-to-calculate-spherical-coordinate-x-y-z-of-a-star-from-magnitude-declin
//http://faraday.uwyo.edu/~admyers/ASTR5160/handouts/51605.pdf

const font = new FontLoader().parse(helvetiker);

const System = ({ data, planetSelected }) => {
    
    let cameraMovePosition = new THREE.Vector3();
    let starPosition = new THREE.Vector3();
    let ref = useRef()

    useEffect(()=>{
        const x =
            data.distance *
            Math.cos(data.declination) *
            Math.cos(data.rightAscension);
        const y =
            data.distance *
            Math.cos(data.declination) *
            Math.sin(data.rightAscension);
        const z = data.distance * Math.sin(data.declination);
            ref.current.position.set(x, y, z);
            ref.current.getWorldPosition(starPosition)
        }, [])

    

    useFrame((state, delta) => {
        console.log("camera position: ", state.camera.position)
        state.camera.position.lerp(cameraMovePosition.set(ref.current.position.getX - 1, ref.current.position.getY, ref.current.position.getZ - .125), .01)
        state.camera.lookAt(ref.current.position.getX - .125, ref.current.position.getY, ref.current.position.getZ)
        state.camera.updateProjectionMatrix()
    })

    // useEffect(()=>{
        
    // }, [])

    return (
        <>
            <mesh 
                ref={ref}
                data={data} 
                onPointerMissed={() => planetSelected(null)}
                >
                <sphereGeometry args={[0.1, 30, 30]} />
                <meshBasicMaterial 
                    color="white"
                    map={data.texture} />    
            </mesh>
            <textGeometry args={[data.name, { font, size: 0.06, height: 0.001 }]} />
            <meshLambertMaterial color={"white"} />
            <Sun position={[starPosition[0] - .25, starPosition[1], starPosition[2]]} />
        </>
    );
}

export default System;
