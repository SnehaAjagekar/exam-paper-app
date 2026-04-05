import { useNavigate } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Decorative rings */}
      <div className="home-decoration">
        <div className="ring ring-1"></div>
        <div className="ring ring-2"></div>
        <div className="ring ring-3"></div>
      </div>

      {/* Main content */}
      <div className="home-content">
        <div className="home-header">
          <h1 className="home-title">SecureExam Portal</h1>
          <p className="home-subtitle">
            Institutional Authority. Human Calm. Exam Security.
          </p>
        </div>

        <p className="home-description">
          Upload and download exam papers with institutional-grade encryption and authentication. Built for universities that take security seriously.
        </p>

        {/* Buttons */}
        <div className="home-actions">
          <button className="btn-primary" onClick={() => navigate("/register")}>
            Create Account
          </button>
          <button className="btn-secondary" onClick={() => navigate("/loginAs")}>
            Sign In
          </button>
        </div>

        {/* Trust indicators */}
        <div className="home-trust">
          <div className="trust-item">
            <span className="trust-icon">🔒</span>
            <span className="trust-text">AES-256 Encryption</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">✓</span>
            <span className="trust-text">Role-Based Access</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">📝</span>
            <span className="trust-text">Full Audit Trail</span>
          </div>
        </div>
      </div>
    </div>
  );
}
