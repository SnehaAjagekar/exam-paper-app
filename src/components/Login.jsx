import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [formData, setFormData] = useState({
    collegeName: "",
    fullName: "",
    role: "distributor", // Default value
    id: "",
    phone: "",
    email: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/register",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage(response.data.message);
      setFormData({
        collegeName: "",
        fullName: "",
        role: "distributor",
        id: "",
        phone: "",
        email: "",
        username: "",
        password: "",
      });
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Something went wrong!");
      }
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "400px" }}>
      <h2 className="text-center">Sign In</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} className="p-3 border rounded shadow">
        
        <div className="mb-3">
          <label className="form-label">College Name</label>
          <input
            type="text"
            className="form-control"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="distributor">Distributor</option>
            <option value="receiver">Receiver</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Distributor/Receiver ID</label>
          <input
            type="text"
            className="form-control"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Register;