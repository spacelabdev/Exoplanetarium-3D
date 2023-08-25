import React, { useState } from "react";
import "./ReturnToSpaceButton.scss";
import returnToSpace from "../../../assets/emojione-v1_milky-way.svg";
import { Link } from "react-router-dom";

const ReturnToSpaceButton = () => {
  const [hovering, setHovering] = useState();
  return (
    <div className="button-wrap">
      <Link to="/">
        <img
          src={returnToSpace}
          alt=" returnToSpace"
          className="return-hover"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        />
      </Link>
      {hovering && <p className="hover-text">Return to space </p>}
    </div>
  );
};

export default ReturnToSpaceButton;
