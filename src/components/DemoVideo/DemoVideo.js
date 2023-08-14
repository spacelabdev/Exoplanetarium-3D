import "./DemoVideo.scss";
import { NavLink } from "react-router-dom";
import HomeButton from "../shared/HomeButton";

function DemoVideo() {
  return (
    <>
      <div className="demo-video">
        <div className="video-wrapper">
          <h1 className="demo-title">Demo Video</h1>
          <NavLink to="/welcome">
            <button id="close-button">X</button>
          </NavLink>

          <div className="video">
            <h2>Video coming soon...</h2>
            {/*
            PLACEHOLDER FOR VIDEO
            <video width=100% preload="auto" autoplay>
              <source src ="path/to/video" type="video/mp4"></source>
            </video>
            */}
          </div>
        </div>
      </div>

      <HomeButton />
    </>
  );
}

export default DemoVideo;
