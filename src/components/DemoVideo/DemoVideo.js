import './DemoVideo.scss';
import { NavLink } from 'react-router-dom';
// import HomeButton from '../shared/HomeButton';

function DemoVideo() {
  return (
    <>
      {/* <h1>Demo Video</h1> */}

      <div className="demo-video">
        <div className="video-wrapper">

          <NavLink to="/welcome">
            <button id="close-button">X</button>
          </NavLink>

          <div className="video">

            {/*
            PLACEHOLDER FOR VIDEO
            <video width=100% preload="auto" autoplay>
              <source src ="path/to/video" type="video/mp4"></source>
            </video>
            */}

            <h2>Video coming soon...</h2>

          </div>
        </div>
      </div>

      {/* <HomeButton /> */}
    </>
  );
}

export default DemoVideo;
