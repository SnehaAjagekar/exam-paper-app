import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [formData, setFormData] = useState({
    collegeName: "",
    fullName: "",
    role: "Distributor", // Default to Distributor
    distributorReceiverId: "",
    phoneNumber: "",
    email: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/register", formData, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage(response.data.message);

      // Redirect to login after successful registration
      setTimeout(() => {
        navigate("/loginAs");
      }, 1000);

    } catch (error) {
      setMessage(error.response ? error.response.data.message : "Something went wrong!");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "400px" }}>
      <h2 className="text-center">Register</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} className="p-3 border rounded shadow">
        {Object.keys(formData).map((field) => (
          field !== "role" && (
            <div className="mb-3" key={field}>
              <label className="form-label">{field.replace(/([A-Z])/g, " $1")}</label>
              <input type={field === "password" ? "password" : "text"} name={field} className="form-control" value={formData[field]} onChange={handleChange} required />
            </div>
          )
        ))}

        <div className="mb-3">
          <label className="form-label">Role</label>
          <select name="role" className="form-control" value={formData.role} onChange={handleChange} required>
            <option value="Distributor">Distributor</option>
            <option value="Receiver">Receiver</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;
