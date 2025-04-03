import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get("role");

  useEffect(() => {
    if (!role) {
      navigate("/loginAs");
    }
  }, [role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        username,
        password,
      });

      const { access_token, role: userRole } = response.data;

      // ✅ Store token consistently
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
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login as {role}</h2>

        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        <p className="text-center mt-3">
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );
}
