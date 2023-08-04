import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IoCloseSharp } from "react-icons/io5";
import { PiDatabaseBold } from 'react-icons/pi';
import placeholderPhoto from "../../assets/textures/tanGasGiant.png";
import "./Database.scss";

const Database = () => {    
  const [showDatabase, setShowDatabase] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  

  // Static array
  const staticExoplanets = [
    { name: 'Exoplanet 1', photo: placeholderPhoto },
    { name: 'Exoplanet 2', photo: placeholderPhoto },
    { name: 'Exoplanet 3', photo: placeholderPhoto },
    { name: 'Exoplanet 4', photo: placeholderPhoto },
    { name: 'Exoplanet 5', photo: placeholderPhoto },

    // Add more exoplanets as needed
  ];

  const handleIconClick = () => {
    setShowDatabase(!showDatabase);
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
      <div
        className={`exoplanet-database ${showDatabase ? 'open' : ''}`}>
        <div className="header">
        <h2>Exoplanetarium Database</h2>
            <div className="close-button" onClick={() => setShowDatabase(false)}>
              <IoCloseSharp />
            </div>
          </div>
          <div className="search-bar">
            <div className="search-box">
              <div className="search-icon">
                <BsSearch />
              </div>
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <p className="result-count-left">
            Displaying 1 to {filteredExoplanets.length} of {totalResults} results
          </p>
          <div className="exoplanets">
            {filteredExoplanets.map((planet) => (
              <div className="exoplanet-item" key={planet.name}>
                <img src={planet.photo || placeholderPhoto} alt={planet.name} className="photo" />
                <div className="exoplanet-info">
                  <h3>{planet.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )

      <div className={`database-icon ${showDatabase ? 'transparent' : ''}`} onClick={handleIconClick}>
        <PiDatabaseBold size={40} />
      </div>
    </div>
  );
};

export default Database;
