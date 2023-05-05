import { React, useRef, useEffect } from "react";
import { Instance } from "@react-three/drei";

function Planet({ data, numPlanets, planetSelected, ...props }) {
  const ref = useRef();

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
      ref.current.position.set(x, y, z);
    }
  }, [data, numPlanets]);

  return (
    <group {...props}>
      <Instance ref={ref}>
        <mesh
          onClick={() => planetSelected(props)}
          onPointerMissed={() => planetSelected(null)}
        >
          <sphereGeometry args={[0.1, 25]} />
          <meshLambertMaterial color="purple" />
        </mesh>
      </Instance>
    </group>
  );
}

export default Planet;
