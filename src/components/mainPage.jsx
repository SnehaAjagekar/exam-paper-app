import { Outlet, useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div style={{ margin: 0, padding: 0 }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <a className="navbar-brand" href="#">VIT</a>
        <div className="ms-auto d-flex align-items-center">
          <span 
            className="nav-link text-light me-3 hover-effect" 
            style={{ cursor: 'pointer' }}
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <span 
            className="nav-link text-light me-3 hover-effect" 
            style={{ cursor: 'pointer' }}
            onClick={() => navigate("/about")}
          >
            About
          </span>
        </div>
      </nav>

      {/* Dynamic Page Content */}
      <div style={{ margin: 0, padding: 0 }}>
        <Outlet />
      </div>

      {/* Add this style tag for hover effects */}
      <style>
        {`
          .hover-effect {
            transition: color 0.3s ease;
          }
          .hover-effect:hover {
            color: #adb5bd !important;  /* Lighter gray color on hover */
          }
        `}
      </style>
    </div>
  );
}