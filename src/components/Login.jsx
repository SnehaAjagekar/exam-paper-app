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
  const role = searchParams.get("role");  // URL se role le raha hai

  useEffect(() => {
    if (!role) {
      navigate("/login-as"); // Agar role select nahi kiya toh "Login As" page pe bhej do
    }
  }, [role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/login", { username, password });

      // Save token in localStorage
      localStorage.setItem("token", response.data.access_token);
      
      setMessage("Login successful! Redirecting...");

      // 🎯 Role ke basis pe redirect
      setTimeout(() => {
        if (role === "Distributor") {
          navigate("/distributor");
        } else {
          navigate("/receiver");
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
