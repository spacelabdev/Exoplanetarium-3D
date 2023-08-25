import "./Welcome.scss";
import { Link } from "react-router-dom";
import ReturnToSpaceButton from "../components/shared/ReturnToSpaceButton/ReturnToSpaceButton";

function Welcome() {
  return (
    <div className="app-welcome">
      <main className="app-container">
        <div className="app-title">
          {/*Testing */}
          <h1>Welcome to Exoplanetarium</h1>
          <h1>by SpaceLab</h1>
        </div>

        <div className="options">
          <Link to="/walkthrough">
            <div className="rectangle">
              <div className="left-rectangle walkthrough"></div>
              <h3>Walkthrough</h3>
              <div className="right-rectangle walkthrough"></div>
            </div>
          </Link>

          <Link to="/demovideo">
            <div className="rectangle">
              <div className="left-rectangle demo"></div>
              <h3>Demo Video</h3>
              <div className="right-rectangle demo"></div>
            </div>
          </Link>

          <Link to="/FAQ">
            <div className="rectangle">
              <div className="left-rectangle faq"></div>
              <h3>FAQ</h3>
              <div className="right-rectangle faq"></div>
            </div>
          </Link>
        </div>
      </main>
      <div className="button-container">
        <ReturnToSpaceButton />
      </div>
    </div>
  );
}

export default Welcome;
