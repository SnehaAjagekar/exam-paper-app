import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { validateToken } from "../utils/tokenValidation";
import { FaUser, FaLock, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

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
      const response = await axios.post("http://127.0.0.1:5000/login", {
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
    <div className="min-vh-100 bg-light d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-xl-5">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white text-center py-4">
                <FaSignInAlt size={48} className="mb-3" />
                <h2 className="mb-0" style={{ fontSize: "28px", fontWeight: "600" }}>
                  Welcome Back
                </h2>
                <p className="mb-0 mt-2 opacity-75">
                  Sign in as <span className="fw-bold">{role}</span>
                </p>
              </div>

              <div className="card-body p-5">
                {message && (
                  <div 
                    className={`alert text-center ${
                      message.includes('successful') ? 'alert-success' : 'alert-danger'
                    }`} 
                    role="alert"
                  >
                    {message}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">
                      <FaUser className="me-2 text-primary" />
                      Username
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Enter your username"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">
                      <FaLock className="me-2 text-primary" />
                      Password
                      <span className="text-danger"> *</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter your password"
                    />
                  </div>

                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" />
                          Signing In...
                        </>
                      ) : (
                        <>
                          <FaSignInAlt className="me-2" />
                          Sign In
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="text-center mt-4 pt-3 border-top">
                  <p className="text-muted mb-2">
                    Don't have an account?{" "}
                    <a href="/register" className="text-decoration-none">
                      <FaUserPlus className="me-1" />
                      Create Account
                    </a>
                  </p>
                  <p className="text-muted mb-0">
                    <a href="/loginAs" className="text-decoration-none text-secondary">
                      ← Back to Role Selection
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
