import { React, useRef } from "react";

function Planet(props) {
  console.log(props);
  const ref = useRef();
  return (
    <>
      <sphereGeometry args={[0.1, 10, 10]} {...props} />
      <meshLambertMaterial color="purple" />
    </>
  );
}

export default Planet;
