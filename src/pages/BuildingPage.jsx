import React, { useEffect, useState } from "react";
import { getBuildingById } from "../services/api";

const BuildingPage = ({ match }) => {
  const [building, setBuilding] = useState(null);

  useEffect(() => {
    const { id } = match.params;
    getBuildingById(id)
      .then((response) => {
        setBuilding(response.data);
      })
      .catch((error) => {
        console.error("Error fetching building:", error);
      });
  }, [match.params]);

  return (
    <div>
      {building ? (
        <>
          <h1>{building.title}</h1>
          <p>{building.description}</p>
          {/* Add more fields as needed */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BuildingPage;
