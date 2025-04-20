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
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url("/image.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="p-4 shadow-lg"
        style={{
          width: "400px",
          backgroundColor: "rgba(255, 248, 240, 0.95)",
          borderRadius: "16px",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
            color: "#5c3a1d",
            fontWeight: "bold",
          }}
        >
          Login as {role}
        </h2>

        {message && (
          <div className="alert alert-info text-center">{message}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ color: "#5c3a1d" }}>
              Username
            </label>
            <input
              type="text"
              className="form-control"
              style={{
                border: "1px solid #c49b6c",
                borderRadius: "8px",
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: "#5c3a1d" }}>
              Password
            </label>
            <input
              type="password"
              className="form-control"
              style={{
                border: "1px solid #c49b6c",
                borderRadius: "8px",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#a27045",
              color: "#fff",
              fontWeight: "500",
            }}
          >
            Login
          </button>
        </form>

        <p className="text-center mt-3" style={{ color: "#5c3a1d" }}>
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );
}
