import React from "react";
import { Link } from "react-router-dom";
import HamburgerMenu from "../hamburgerMenu/hamburgerMenu";
import "./navigation.styles.scss";

const Navigation = () => {
  return (
    <div className="navigation-container">
      <div className="hamburger-wrapper">
        <HamburgerMenu />
      </div>
      <nav>
        <div className="logo-container">
          <Link className="logo-link" to="/">
            {/* <img src={Logo} alt="logo" /> */}
            Exoplanetarium 3D
          </Link>
        </div>
        <div className="nav-links">
          <div className="nav-dropdown">
            <p className="nav-menu-item nav-dropdown__name">Visualize</p>
            <div className="nav-dropdown__content">
              <Link className="nav-link" to="/visualize">
                Dataset #1
              </Link>
            </div>
          </div>
          <Link className="nav-menu-item nav-link" to="/about">
            About
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
