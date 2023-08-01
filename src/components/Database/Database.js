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
    { name: 'Exoplanet 4', distance: '250 light-years' },
    { name: 'Exoplanet 5', distance: '350 light-years' },
    { name: 'Exoplanet 6', distance: '300 light-years' },
    { name: 'Exoplanet 7', distance: '400 light-years' },

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

  const totalResults = filteredExoplanets.length;

  return (
    <div>
      {showDatabase && (
        <div className="exoplanet-database">
          <div className="header">
          <h2>Exoplanetarium Database</h2>
            <div className="close-button" onClick={() => setShowDatabase(false)}>
              X
            </div>
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
          <p className="result-count">
            Displaying 1 to {filteredExoplanets.length} of {totalResults} results
          </p>
          
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
        title="Database"
      />

    </div>
  );
};

export default Database;
