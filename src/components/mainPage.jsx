import { Outlet, useNavigate } from "react-router-dom";
import '../styles/main-page.css';

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="main-page-wrapper">
      {/* Navigation Bar */}
      <nav className="main-navbar">
        <div className="navbar-container">
          <button 
            className="navbar-brand"
            onClick={() => navigate("/")}
            title="Go to home"
          >
            <span className="navbar-brand-icon">🔒</span>
            <span className="navbar-brand-text">SecureExam</span>
          </button>
          
          <div className="navbar-menu">
            <button 
              className="navbar-link"
              onClick={() => navigate("/")}
              title="Go to home"
            >
              Home
            </button>
            <button 
              className="navbar-link"
              onClick={() => navigate("/about")}
              title="View about page"
            >
              About
            </button>
          </div>
        </div>
      </nav>

      {/* Dynamic Page Content */}
      <div className="page-wrapper">
        <Outlet />
      </div>
    </div>
  );
}