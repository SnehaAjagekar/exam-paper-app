import { Outlet, useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <a className="navbar-brand" href="#" >VIT</a>
        <div className="ms-auto">
          <button className="btn btn-light me-2" onClick={() => navigate("/")}>
            Home
          </button>
          <button className="btn btn-primary me-2" onClick={() => navigate("/register")}>
            Sign In
          </button>
          <button className="btn btn-outline-light" onClick={() => navigate("/loginAs")}>
            Login
          </button>
        </div>
      </nav>

      {/* Dynamic Content */}
      <div className="container mt-5">
        <Outlet />
      </div>
    </div>
  );
}
