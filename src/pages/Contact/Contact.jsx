import React from "react";
import "./Contact.scss";
import HomeButton from "../../components/shared/HomeButton";
import { IconContext } from "react-icons";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contact-wrapper">
      <>
        <div className="contact-container">
          <h1 className="title">Contact Us</h1>
          <p>Email us at info@spacelab.space</p>
          <p>Or</p>
          <p>Find us on social media!</p>
          <div className="social-icons">
            <IconContext.Provider value={{ color: "white", size: "2rem" }}>
              <a
                href="https://www.linkedin.com/company/spacelab-space/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin className="icon" />
              </a>

              <a
                href="https://www.instagram.com/spacelab_space"
                target="_blank"
                rel="noreferrer"
              >
                <AiOutlineInstagram className="icon" />
              </a>
              <a
                href="https://twitter.com/SpaceLab_social"
                target="_blank"
                rel="noreferrer"
              >
                <AiOutlineTwitter className="icon" />
              </a>
            </IconContext.Provider>
          </div>
        </div>

        <HomeButton />
      </>
    </div>
  );
};

export default Contact;
