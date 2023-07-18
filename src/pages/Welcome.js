import './Welcome.scss';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="App-welcome">
      <main className="App-container">
        <h1>Welcome to Exoplanetarium by SpaceLab</h1>
        <Link to="/walkthrough">Walkthrough</Link>
        <Link to="/demovideo">Demo Video</Link>
        <Link to="/FAQ">FAQ</Link>
      </main>
    </div>
  );
}

export default Welcome;
