import React, { useEffect, useState } from "react";
import { getBuildings } from "../services/api";
import "../App.css"; // Import the CSS file

const HomePage = () => {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    getBuildings()
      .then((response) => {
        setBuildings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching buildings:", error);
      });
  }, []);

  return (
    <div className="homePage">
      <h1>Explore Our Featured Properties</h1>
      <div className="buildings-container">
        {buildings.map((building) => (
          <div className="building-card" key={building._id}>
            <b>{building.title}</b>
            <p>{building.description}</p>
            <p>Bedrooms: {building.bedrooms}</p>
            <p>Bathrooms: {building.bathrooms}</p>
            <p>Price: ${building.price}</p>
            <p>Location: {building.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
