import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import "../App.css"; // Import the CSS file

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("register button pressed")
      await registerUser({ name, email, password, role });
      navigate("/login");
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const toggleRole = () => {
    setRole((prevRole) => (prevRole === "buyer" ? "seller" : "buyer"));
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h1>Register</h1>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role</label>
          <button
            type="button"
            onClick={toggleRole}
            className="toggle-role-btn"
          >
            {role === "buyer" ? "Switch to Seller" : "Switch to Buyer"}
          </button>
          <p className="selected-role">Selected role: {role}</p>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
