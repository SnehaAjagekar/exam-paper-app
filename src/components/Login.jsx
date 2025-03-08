import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const token = response.data.access_token;
      localStorage.setItem("token", token); // Store JWT Token
      setMessage("Login successful!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "400px" }}>
      <h2 className="text-center">Login</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleLogin} className="p-3 border rounded shadow">
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
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
