import React, { useState } from 'react';
import { IoMenuSharp, IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import './HamburgerMenu.scss';

function MenuOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="MenuOverlay">
      <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
        <IoMenuSharp className="menu-icon"></IoMenuSharp>
      </button>

      <Menu
        right
        isOpen={isOpen}
        onStateChange={({ isOpen }) => setIsOpen(isOpen)}
      >
        <nav className="menu-box">
          <nav className="menu-items">
            <p>Menu</p>
            <Link
              to="/welcome"
              className="menu-link"
              onClick={() => setIsOpen(false)}
            >
              {' '}
              Welcome
            </Link>
            <Link to="/" className="menu-link" onClick={() => setIsOpen(false)}>
              {' '}
              Tutorial
            </Link>
            <Link
              to="/settings"
              className="menu-link"
              onClick={() => setIsOpen(false)}
            >
              {' '}
              Settings
            </Link>
            <Link
              to="/contact"
              className="menu-link"
              onClick={() => setIsOpen(false)}
            >
              {' '}
              Contact Us
            </Link>
          </nav>
        </nav>

        {isOpen && (
          <button
            className="menu-close-button"
            onClick={() => setIsOpen(false)}
          >
            <IoCloseSharp className="menu-icon"></IoCloseSharp>
          </button>
        )}
      </Menu>
    </section>
  );
}

export default MenuOverlay;
