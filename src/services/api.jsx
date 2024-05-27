import axios from "axios";

const API_URL = "https://rentiifyserver.onrender.com/api";

export const registerUser = (userData) =>
  axios.post(`${API_URL}/users/`, userData);
export const loginUser = (userData) =>
  axios.post(`${API_URL}/users/login`, userData);

export const getBuildings = () => axios.get(`${API_URL}/buildings`);
export const sellerInfo = (id) => axios.get(`${API_URL}/buildings/${id}/info`);
export const getBuildingById = (id) => axios.get(`${API_URL}/buildings/${id}`);
export const createBuilding = (buildingData, token) =>
  axios.post(`${API_URL}/buildings`, buildingData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
export const editBuilding = (id, buildingData, token) =>
  axios.put(`${API_URL}/buildings/${id}`, buildingData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const deleteBuilding = (id, token) =>
  axios.delete(`${API_URL}/buildings/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
