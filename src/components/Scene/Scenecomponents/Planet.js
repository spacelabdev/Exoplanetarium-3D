import { React, useRef, useEffect } from "react";
import { Instance } from "@react-three/drei";

function Planet({ data, numPlanets, planetSelected, ...props }) {
  const planetRef = useRef();

  useEffect(() => {
    for (let d = 0; d < numPlanets; ++d) {
      const x =
        props.distance *
        Math.cos(props.declination) *
        Math.cos(props.rightAscension);
      const y =
        props.distance *
        Math.cos(props.declination) *
        Math.sin(props.rightAscension);
      const z = props.distance * Math.sin(props.declination);
      planetRef.current.position.set(x, y, z);
      planetRef.current.data = data[d]
      console.log("Data: ", data)
      console.log(`Data[${d}]: `, data[d])
      console.log("planetRef.current: ", planetRef.current)
    }
  }, [data, numPlanets]);

  // useEffect(()=>{
  //   planetRef.current
  // }, [planetSelected])

  return (
    <group {...props}>
      <Instance ref={planetRef}>
        <mesh
          onClick={(event) => {
            let currentRefData = planetRef.current
            console.log("currentRef @ Planet click: ", currentRefData)
            planetSelected(event, currentRefData)
          }}
          onPointerMissed={(event) => planetSelected(event, undefined)}
        >
          <sphereGeometry args={[0.1, 25]} />
          <meshLambertMaterial color="purple" />
        </mesh>
      </Instance>
    </group>
  );
}

export default Planet;
