//Import React
import React, { useState } from 'react';
//Icons used
import { BsSearch } from 'react-icons/bs';
import { IoCloseSharp } from "react-icons/io5";
import { PiDatabaseBold } from 'react-icons/pi';
//Placeholder photo for exoplanets
import placeholderPhoto from "../../assets/textures/tanGasGiant.png";
//Import corresponding scss
import "./Database.scss";

//Set everything to defaults
const Database = () => {    
  const [showDatabase, setShowDatabase] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  

  // Static array
  const staticExoplanets = [
    { name: 'Exoplanet 1', photo: placeholderPhoto },
    { name: 'Exoplanet 2', photo: placeholderPhoto },
    { name: 'Exoplanet 3', photo: placeholderPhoto },
    { name: 'Exoplanet 4', photo: placeholderPhoto },
    { name: 'Exoplanet 5', photo: placeholderPhoto },
    { name: 'Exoplanet 6', photo: placeholderPhoto },
    { name: 'Exoplanet 7', photo: placeholderPhoto },
    { name: 'Exoplanet 8', photo: placeholderPhoto },
    { name: 'Exoplanet 9', photo: placeholderPhoto },

    // Add more exoplanets as needed
  ];

  //Shows database
  const handleIconClick = () => {
    setShowDatabase(!showDatabase);
  };

  //Updates searching
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  //Changes to lowercase for searching ease
  const filteredExoplanets = staticExoplanets.filter((planet) =>
    planet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Keeps track of total numbers for the "Displaying..." line
  const totalResults = filteredExoplanets.length;

  return (
    <div>
      <div
        className={`exoplanet-database ${showDatabase ? 'open' : ''}`}>
        {/* Sets header */}
        <div className="header">
        <h2>Exoplanetarium Database</h2>
            {/* Close functionality */}
            <div className="close-button" onClick={() => setShowDatabase(false)}>
              <IoCloseSharp />
            </div>
          </div>
          <div className="search-bar">
            <div className="search-box">
              {/*Set search icon */}
              <div className="search-icon">
                <BsSearch />
              </div>
              {/* Search input necessities */}
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          {/* Displaying x of x out of x */}
          <p className="result-count-left">
            Displaying 1 to {filteredExoplanets.length} of {totalResults} results
          </p>
          {/* Exoplanet shelves */}
          <div className="exoplanets">
            {/* Filtering planets */}
            {filteredExoplanets.map((planet) => (
              <div className="exoplanet-item" key={planet.name}>
                {/* Displaying photo */}
                <img src={planet.photo || placeholderPhoto} alt={planet.name} className="photo" />
                {/* Where data would go */}
                <div className="exoplanet-info">
                  <h3>{planet.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      

      {/* Database icon disappears / unclickable when database is open */}
      <div
        className={`database-icon ${showDatabase ? 'transparent unclickable' : ''}`}
        onClick={handleIconClick}
        //Shows database label or not depending on mouse hovering
        onMouseEnter={() => setShowTooltip(true)} 
        onMouseLeave={() => setShowTooltip(false)} 
      >
        {/* Tooltip for Database label */}
        {showTooltip && <div className="tooltip">Database</div>}
         {/* Database icon size */}
        <PiDatabaseBold size={40} />
      </div>
    </div>
  );
};

export default Database;
