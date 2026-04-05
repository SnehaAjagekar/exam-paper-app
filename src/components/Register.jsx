import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaUser, FaEnvelope, FaLock, FaPhone, FaBuilding, FaIdCard, FaUserTie, FaArrowLeft } from "react-icons/fa";
import "../styles/auth.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

const Register = () => {
  const [formData, setFormData] = useState({
    collegeName: "",
    fullName: "",
    role: "Distributor",
    distributorReceiverId: "",
    phoneNumber: "",
    email: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/register`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage(response.data.message);
      setTimeout(() => navigate("/loginAs"), 1000);
    } catch (error) {
      setMessage(error.response ? error.response.data.message : "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldIcon = (field) => {
    const iconMap = {
      collegeName: FaBuilding,
      fullName: FaUser,
      distributorReceiverId: FaIdCard,
      phoneNumber: FaPhone,
      email: FaEnvelope,
      username: FaUser,
      password: FaLock,
    };
    return iconMap[field] || FaUser;
  };

  const getFieldLabel = (field) => {
    const labelMap = {
      collegeName: "College Name",
      fullName: "Full Name",
      distributorReceiverId: "Distributor/Receiver ID",
      phoneNumber: "Phone Number",
      email: "Email Address",
      username: "Username",
      password: "Password",
    };
    return labelMap[field] || field.replace(/([A-Z])/g, " $1");
  };

  return (
    <div className="auth-container">
      <div className="auth-card auth-card-wide">
        <div className="auth-header">
          <FaUserPlus className="auth-header-icon" />
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join the SecureExam Portal community</p>
        </div>

        <div className="auth-body">
          {message && (
            <div 
              className={`auth-alert ${
                message.includes('successful') || message.includes('created') 
                  ? 'alert-success' 
                  : 'alert-danger'
              }`} 
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form register-form">
            <div className="form-row">
              {Object.keys(formData).map((field) =>
                field !== "role" ? (
                  <div className="form-group" key={field}>
                    <label className="form-label">
                      {React.createElement(getFieldIcon(field), { className: "form-icon" })}
                      {getFieldLabel(field)}
                    </label>
                    <input
                      type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                      name={field}
                      className="form-control"
                      value={formData[field]}
                      onChange={handleChange}
                      required
                      placeholder={`Enter your ${getFieldLabel(field).toLowerCase()}`}
                    />
                  </div>
                ) : null
              )}

              {/* Role select */}
              <div className="form-group">
                <label className="form-label">
                  <FaUserTie className="form-icon" />
                  Role
                </label>
                <select
                  name="role"
                  className="form-control"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="Distributor">Distributor</option>
                  <option value="Receiver">Receiver</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                <>
                  <FaUserPlus className="me-2" />
                  Create Account
                </>
              )}
            </button>
          </form>
        </div>

        <div className="auth-footer">
          <p className="footer-text">
            Already have an account? <a href="/loginAs">Sign in here</a>
          </p>
          <a href="/" className="back-link">
            <FaArrowLeft size={14} className="me-1" />
            Back to home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
