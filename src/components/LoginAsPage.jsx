import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateToken } from "../utils/tokenValidation";
import { FaUpload, FaDownload, FaArrowRight } from "react-icons/fa";
import "../styles/login-as-page.css";

const LoginAsPage = () => {
  const navigate = useNavigate();
          
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

  return (
    <div className="login-as-container">
      <div className="login-as-content">
        <div className="login-as-header">
          <h1 className="login-as-title">Select Your Role</h1>
          <p className="login-as-subtitle">
            Choose how you'll access the SecureExam Portal
          </p>
        </div>

        <div className="login-as-cards">
          {/* Distributor Card */}
          <div 
            className="role-card distributor-card fade-in-card"
            onClick={() => navigate("/login?role=Distributor")}
          >
            <div className="role-card-content">
              <div className="role-icon distributor-icon">
                <FaUpload size={40} />
              </div>
              <h2 className="role-title">Distributor</h2>
              <p className="role-description">
                Upload exam papers and manage distribution to receivers
              </p>
              <div className="role-features">
                <div className="feature">✓ Upload multiple paper sets</div>
                <div className="feature">✓ Assign to receivers</div>
                <div className="feature">✓ View upload history</div>
              </div>
              <div className="role-action">
                Continue as Distributor
                <FaArrowRight className="ms-2" size={16} />
              </div>
            </div>
          </div>

          {/* Receiver Card */}
          <div 
            className="role-card receiver-card fade-in-card"
            onClick={() => navigate("/login?role=Receiver")}
            style={{ animationDelay: '80ms' }}
          >
            <div className="role-card-content">
              <div className="role-icon receiver-icon">
                <FaDownload size={40} />
              </div>
              <h2 className="role-title">Receiver</h2>
              <p className="role-description">
                Access and download exam papers assigned to you
              </p>
              <div className="role-features">
                <div className="feature">✓ Browse exam papers</div>
                <div className="feature">✓ Secure download access</div>
                <div className="feature">✓ Track your downloads</div>
              </div>
              <div className="role-action">
                Continue as Receiver
                <FaArrowRight className="ms-2" size={16} />
              </div>
            </div>
          </div>
        </div>

        <div className="login-as-footer">
          <p className="footer-text">
            Don't have an account? <a href="/register">Create one now</a>
          </p>
          <p className="footer-text back-link">
            <a href="/">← Back to home</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginAsPage;
