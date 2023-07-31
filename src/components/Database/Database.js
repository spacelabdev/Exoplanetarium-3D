import React, { useState } from 'react';
import "./Database.scss";
import databaseIcon from "../../assets/database.png";

const Database = () => {    
  const [showDatabase, setShowDatabase] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Static array
  const staticExoplanets = [
    { name: 'Exoplanet 1', distance: '100 light-years' },
    { name: 'Exoplanet 2', distance: '200 light-years' },
    { name: 'Exoplanet 3', distance: '150 light-years' },
    // Add more exoplanets as needed
  ];

  const handleIconClick = () => {
    setShowDatabase(true);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredExoplanets = staticExoplanets.filter((planet) =>
    planet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>


      {showDatabase && (
        <div className="exoplanet-database">
          <div className="header">
            <div className="close-button" onClick={() => setShowDatabase(false)}>
              X
            </div>
            <h2>Exoplanetarium Database</h2>
          </div>
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="exoplanets">
            {filteredExoplanets.map((planet) => (
              <div className="exoplanet-item" key={planet.name}>
                <h3>{planet.name}</h3>
                <p>Distance: {planet.distance}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <img
        src={databaseIcon}
        alt="Database Icon"
        className="database-icon"
        onClick={handleIconClick}
      />

    </div>
  );
};

export default Database;
