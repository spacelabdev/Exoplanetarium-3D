import React from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "./hamburgerMenu.scss";

/**
 * Renders the hamburger menu for smaller scree sizes.
 *
 *  More information on react-burger-menu can be found here:
 *  https://github.com/negomi/react-burger-menu
 */
class HamburgerMenu extends React.Component {
  render() {
    return (
      <>
        <Menu right>
          <div className="hamburger-nav-links">
            <div>
              <Link
                className={"hamburger-nav-link"}
                to={"/visualize"}
                style={{ textDecoration: "none" }}
              >
                Visualize
              </Link>
            </div>
            <div>
              <Link
                className={"hamburger-nav-link"}
                to={"/about"}
                style={{ textDecoration: "none" }}
              >
                About
              </Link>
            </div>
          </div>
        </Menu>
      </>
    );
  }
}

export default HamburgerMenu;
