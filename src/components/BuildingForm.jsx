import React, { useState } from "react";
import { createBuilding } from "../services/api";

const BuildingForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBuilding = { title, description };
      await createBuilding(newBuilding);
      // Optionally, you can add logic to reset form fields or show a success message
    } catch (error) {
      console.error("Error creating building:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Building</h2>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      {/* Add more fields as needed */}
      <button type="submit">Add Building</button>
    </form>
  );
};

export default BuildingForm;
