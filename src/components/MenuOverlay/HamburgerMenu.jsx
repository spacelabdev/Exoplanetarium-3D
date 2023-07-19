import React, { useState } from "react";
import { IoMenuSharp, IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "./HamburgerMenu.scss";

function MenuOverlay() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="MenuOverlay">
            <div className="menu-button" onClick={() => setIsOpen(!isOpen)}>
                <IoMenuSharp size={35} />
            </div>

            <Menu
                right
                isOpen={isOpen}
                onStateChange={({ isOpen }) => setIsOpen(isOpen)}
                width={"250px"}
            >
                <div className="menu-box">
                    <div className="menu-items">
                        <p>Menu</p>
                        <Link to="/welcome" style={{ textDecoration: "none" }}> Welcome</Link>
                        <Link to="/" style={{ textDecoration: "none" }}> Tutorial</Link>
                        <Link to="/" style={{ textDecoration: "none" }}> Settings</Link>
                        <Link to="/" style={{ textDecoration: "none" }}> Contact Us</Link>
                    </div>
                </div>

                {isOpen && (
                    <div className="menu-close-button" onClick={() => setIsOpen(false)}>
                        <IoCloseSharp size={35} />
                    </div>
                )}
            </Menu>
        </div>
    );
}

export default MenuOverlay;