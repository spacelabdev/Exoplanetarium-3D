import { AiOutlineHome } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

function HomeButton() {
  return (
    <NavLink to="/welcome" className="home-button">
      <AiOutlineHome size={50} />
    </NavLink>
  );
}

export default HomeButton;
