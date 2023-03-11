import React from "react";
import Navigation from "../../components/navigation/navigation.component";
import Scene from "../../components/Scene/Scene";
import Footer from "../../components/footer/footer.component";
import "./visualize.styles.scss";

const Visualize = () => {
  return (
    <div className="visualize-container">
      <Navigation className="area-header" />
      <div className="area-content">
        <Scene />
      </div>
      <Footer className="area-footer" />
    </div>
  );
};

export default Visualize;
