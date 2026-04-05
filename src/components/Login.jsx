import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { validateToken } from "../utils/tokenValidation";
import { FaUser, FaLock, FaSignInAlt, FaArrowLeft } from "react-icons/fa";
import "../styles/auth.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get("role");
        
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const storedUser = validateToken(token);
    
    console.log('storedUser', storedUser);
    if(storedUser && typeof storedUser === 'object' && storedUser.role === "Receiver"){
      navigate("/receiver")
    } else if(storedUser && typeof storedUser === 'object' && storedUser.role === "Distributor"){
      navigate("/distributor")
    }
  }, [navigate]);

  useEffect(() => {
    if (!role) {
      navigate("/loginAs");
    }
  }, [role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        username,
        password,
      });

      const { access_token, role: userRole } = response.data;

      localStorage.setItem("access_token", access_token);
      localStorage.setItem("role", userRole);

      setMessage("Login successful! Redirecting...");

      setTimeout(() => {
        if (userRole === "Distributor") {
          navigate("/distributor");
        } else if (userRole === "Receiver") {
          navigate("/receiver");
        } else {
          navigate("/loginAs");
        }
      }, 1000);
    } catch (error) {
      setMessage(error.response ? error.response.data.message : "Invalid credentials!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <FaSignInAlt className="auth-header-icon" />
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">
            Sign in as <span className="role-badge">{role}</span>
          </p>
        </div>

        <div className="auth-body">
          {message && (
            <div 
              className={`auth-alert ${
                message.includes('successful') ? 'alert-success' : 'alert-danger'
              }`} 
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">
                <FaUser className="form-icon" />
                Username
              </label>
              <input
                type="text"
                name="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <FaLock className="form-icon" />
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="btn-primary auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Signing In...
                </>
              ) : (
                <>
                  <FaSignInAlt className="me-2" />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        <div className="auth-footer">
          <p className="footer-text">
            Don't have an account? <a href="/register">Create one</a>
          </p>
          <a href="/loginAs" className="back-link">
            <FaArrowLeft size={14} className="me-1" />
            Back to Role Selection
          </a>
        </div>
      </div>
    </div>
  );
}
