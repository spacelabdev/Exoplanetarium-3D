import { React, useRef } from "react";

function Sun({ position, ...props }) {
  const ref = useRef();

  return (
    <mesh>
      <sphereGeometry position={position} args={[0.3, 16, 16]} />
      <meshLambertMaterial color="yellow" />
    </mesh>
  );
}

export default Sun;
