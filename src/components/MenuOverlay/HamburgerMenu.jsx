import React, { useState } from "react";
import { Divide as Hamburger } from 'hamburger-react'
import { IoMenuSharp, IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "./HamburgerMenu.scss";

function MenuOverlay() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="MenuOverlay">
            <div className="menu-button" onClick={() => setIsOpen(!isOpen)}>
                {/* <Hamburger toggled={isOpen} toggle={setIsOpen} /> */}
                <IoMenuSharp size={35} />
            </div>

            <Menu // slide transition
                right
                isOpen={isOpen}
                onStateChange={({ isOpen }) => setIsOpen(isOpen)}
                customCrossIcon={false}
                width={"250px"}
                itemListElement="div"
            >

                <div className="menu-box">
                <p>Menu</p>
                    <div className="menu-items">
                        
                        <Link to="/" style={{ textDecoration: "none" }}> Tutorial</Link>
                        <Link to="/" style={{ textDecoration: "none" }}> Settings</Link>
                        <Link to="/" style={{ textDecoration: "none" }}> Contact Us</Link>
                        <Link to="/" style={{ textDecoration: "none" }}> Menu Item</Link>
                        <Link to="/" style={{ textDecoration: "none" }}> Menu Item</Link>
                        <Link to="/" style={{ textDecoration: "none" }}> Menu Item</Link>
                    </div>
                </div>
                {isOpen && ( // if menu is open render the menu items
                    // wrapper for when open
                    <div className="menu-close-button" onClick={() => setIsOpen(false)}>
                        <IoCloseSharp size={35} />
                    </div>
                )}
            </Menu>
        </div>
    );
}

export default MenuOverlay;