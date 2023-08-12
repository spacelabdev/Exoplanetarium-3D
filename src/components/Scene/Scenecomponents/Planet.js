import { React, useRef, useEffect } from "react";
import { Instance } from "@react-three/drei";
import { useFrame } from '@react-three/fiber'


function Planet({ data, numPlanets, planetSelected, texture, ...planet }) {
  const ref = useRef();

  useEffect(() => {
    for (let d = 0; d < numPlanets; ++d) {
      const x =
        planet.distance *
        Math.cos(planet.declination) *
        Math.cos(planet.rightAscension);
      const y =
        planet.distance *
        Math.cos(planet.declination) *
        Math.sin(planet.rightAscension);
      const z = planet.distance * Math.sin(planet.declination);
      ref.current.position.set(x, y, z);
    }
  }, [data, numPlanets]);

  useFrame(()=> {
    ref.current.rotation.y = ref.current.rotation.y + .01
  })

  return (
    <group {...planet}>
      <Instance ref={ref} >
        <mesh 
          onClick={() => {
            planetSelected({...planet, texture: texture})
          }}
          onPointerMissed={() => planetSelected(null)}>
          <sphereGeometry args={[0.1, 30, 30]} />
          <meshBasicMaterial 
            map={texture}
            vertexColors={false}
            color="white"
            />
        </mesh>
      </Instance>
    </group>
  );
}

export default Planet;
