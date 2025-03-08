import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
        const response = await axios.post(
            "http://127.0.0.1:5000/register",
            { username, password },
            { headers: { "Content-Type": "application/json" } }
          );
          

      setMessage(response.data.message);
      setUsername("");
      setPassword("");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Something went wrong!");
      }
    }
  };

  return (
    
    <div className="container mt-4 " style={{ maxWidth: "400px" }} >
      <h2 className="text-center">Sign In </h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} className="p-3 border rounded shadow">
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
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Register;
