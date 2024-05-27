import React, { useEffect, useState } from "react";
import { getBuildingById } from "../services/api";

const BuildingDetail = ({ match }) => {
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
          <h2>{building.title}</h2>
          <p>{building.description}</p>
          {/* Add more details here */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BuildingDetail;
