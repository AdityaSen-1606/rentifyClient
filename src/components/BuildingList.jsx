import React, { useEffect, useState } from "react";
import { getBuildings } from "../services/api";

const BuildingList = () => {
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
    <div>
      <h2>Available Buildings</h2>
      <ul>
        {buildings.map((building) => (
          <li key={building._id}>
            <a href={`/building/${building._id}`}>{building.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BuildingList;
