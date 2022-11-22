import {React, useRef} from 'react';

function Planet(props) {
    const ref = useRef()
    return (
        <>
            <sphereGeometry args={[.1, 10, 10]} {...props} />
            <meshLambertMaterial color="green"/>
        </>
    )
  }

export default Planet;