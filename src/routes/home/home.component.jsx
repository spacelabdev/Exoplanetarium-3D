import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/navigation/navigation.component";
import Footer from "../../components/footer/footer.component";
import "./home.styles.scss";

const Home = () => {
  return (
    <div className="home-container">
      <Navigation className="area-header" />
      <div className="area-content">
        <h1>Landing Page</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida
          cum sociis natoque penatibus et magnis. In nulla posuere sollicitudin
          aliquam ultrices sagittis orci a scelerisque. Sit amet mattis
          vulputate enim nulla. Turpis nunc eget lorem dolor sed viverra ipsum.
          Lorem ipsum dolor sit amet consectetur. Viverra nam libero justo
          laoreet sit amet cursus. Luctus venenatis lectus magna fringilla urna
          porttitor rhoncus dolor purus. 
        </p>
        <p>View a dataset:</p>
        <ul>
          <li><Link to="/visualize">Dataset #1</Link></li>
        </ul>
      </div>
      <Footer className="area-footer" />
    </div>
  );
};

export default Home;
