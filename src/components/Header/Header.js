import "./Header.scss";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="App-header">
      <Link to="/" className="menu-link">
        {" "}
        <p>Exoplanetarium 3D</p>
      </Link>
    </header>
  );
}

export default Header;
