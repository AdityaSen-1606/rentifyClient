import React, { useState, useEffect } from "react";
import {
  createBuilding,
  deleteBuilding,
  editBuilding,
  getBuildings,
} from "../services/api";
import "../App.css"; // Import the CSS file

const SellerDashboard = () => {
  const [buildings, setBuildings] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBuildingId, setCurrentBuildingId] = useState(null);

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    getBuildings()
      .then((response) => {
        setBuildings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching buildings:", error);
      });
  }, []);

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("price", price);
    formData.append("location", location);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      if (isEditing) {
        const { data } = await editBuilding(
          currentBuildingId,
          formData,
          authToken
        );
        setBuildings(
          buildings.map((building) =>
            building._id === currentBuildingId ? data : building
          )
        );
      } else {
        const { data } = await createBuilding(formData, authToken);
        setBuildings([...buildings, data]);
      }
      resetForm();
    } catch (error) {
      console.error(
        `Error ${isEditing ? "editing" : "creating"} building:`,
        error
      );
    }
  };

  const handleEdit = (building) => {
    setTitle(building.title);
    setDescription(building.description);
    setBedrooms(building.bedrooms);
    setBathrooms(building.bathrooms);
    setPrice(building.price);
    setLocation(building.location);
    setIsEditing(true);
    setCurrentBuildingId(building._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBuilding(id, authToken);
      setBuildings(buildings.filter((building) => building._id !== id));
    } catch (error) {
      console.error("Error deleting building:", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setBedrooms("");
    setBathrooms("");
    setPrice("");
    setLocation("");
    setImages([]);
    setIsEditing(false);
    setCurrentBuildingId(null);
  };

  return (
    <div className="dashboard-container">
      <div className="form-container">
        <h1>Seller Dashboard</h1>
        <form onSubmit={handleSubmit}>
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
          <div>
            <label>Bedrooms</label>
            <input
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Bathrooms</label>
            <input
              type="number"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Images</label>
            <input type="file" multiple onChange={handleImageChange} />
          </div>
          <button type="submit">
            {isEditing ? "Update Building" : "Add Building"}
          </button>
          {isEditing && (
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </form>
      </div>
      <div className="building-list">
        {buildings.map((building) => (
          <div key={building._id} className="building-card">
            <h2>{building.title}</h2>
            <p>{building.description}</p>
            <p>Bedrooms: {building.bedrooms}</p>
            <p>Bathrooms: {building.bathrooms}</p>
            <p>Price: ${building.price}</p>
            <p>Location: {building.location}</p>
            <div>
              <button className="edit" onClick={() => handleEdit(building)}>
                Edit
              </button>
              <button
                className="delete"
                onClick={() => handleDelete(building._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerDashboard;
