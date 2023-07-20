import './Welcome.scss';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="App-welcome">
      <main className="App-container">
        <h1>Welcome to Exoplanetarium by SpaceLab</h1>
        <div className="rectangle">
          <div className="left-rectangle"></div>
          <Link to="/walkthrough">Walkthrough</Link>
          <div className="right-rectangle"></div>
        </div>

        <div className="rectangle">
          <div className="left-rectangle demo"></div>
          <Link to="/demovideo">Demo Video</Link>
          <div className="right-rectangle demo"></div>
        </div>

        <Link to="/FAQ">FAQ</Link>
      </main>
    </div>
  );
}

export default Welcome;
