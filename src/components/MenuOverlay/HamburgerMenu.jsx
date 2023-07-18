import React, { useState } from "react";
import { Divide as Hamburger } from 'hamburger-react'
import { Link } from "react-router-dom";
import "./HamburgerMenu.scss";

function MenuOverlay() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="MenuOverlay">
            {/* <Hamburger label="Show menu" />  */}
            <Hamburger onToggle={setIsOpen}/>
            {isOpen && ( //if menu is open render the menu items
            <div className="menu-items">
                <Link to="/">Tutorial</Link>
                <Link to="/">Settings</Link>
                <Link to="/">Contact Us</Link>
                <Link to="/">Menu Item</Link>
            </div>
            )}
        </div>
    );
}
  
export default MenuOverlay;