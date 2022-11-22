import {React, useEffect, useRef, useState} from 'react';
import { useFrame } from '@react-three/fiber';
import { Instances } from '@react-three/drei';
import * as THREE from 'three';
import Planet from './Planet';

/*https://codesandbox.io/s/floating-instanced-shoes-h8o2d*/

const planetObject = new THREE.Object3D();

function Map({ data }) {
    const numPlanets = data.length;
    const ref = useRef()
    useEffect(() => {
      // Set positions
      let count = 0;
      for (let rho = 10; rho <= 25; rho += 4) {
        for (let theta = 0; theta < 360; theta += (360 / 16)) {
            for (let phi = 0; phi < 360; phi += (360 / 16) ) {
                ++count;
                const x = rho * Math.sin(phi) * Math.cos(theta);
                const y = rho * Math.sin(phi) * Math.sin(theta);
                const z = rho * Math.cos(phi);
                planetObject.position.set(x,y,z);
                planetObject.updateMatrix()
                ref.current.setMatrixAt(count, planetObject.matrix)
            }
        }
      }
      // Update the instance
      ref.current.instanceMatrix.needsUpdate = true
    }, [])
    return (
      <instancedMesh ref={ref} args={[null, null, numPlanets]}>
        <Planet />
      </instancedMesh>
    )
  }

export default Map;