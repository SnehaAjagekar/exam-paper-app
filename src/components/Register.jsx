import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [formData, setFormData] = useState({
    collegeName: "",
    fullName: "",
    role: "Distributor",
    distributorReceiverId: "",
    phoneNumber: "",
    email: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/register", formData, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage(response.data.message);
      setTimeout(() => navigate("/loginAs"), 1000);
    } catch (error) {
      setMessage(error.response ? error.response.data.message : "Something went wrong!");
    }
};


  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundImage: `url("/image.png")`, // Replace with your image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="p-5 rounded shadow-lg"
        style={{
          width: "40%",
          maxWidth: "600px",
          backgroundColor: "rgba(0, 0, 0, 0.2)", // Optional: Can keep this to give a slightly darker background to the form
          color: "#fff",
          paddingTop: "30px", // Padding at the top of the box
          paddingBottom: "30px",
        }}
      >
        <h2 className="text-center mb-4" style={{ fontSize: "32px", fontWeight: "600" }}>
          Create an Account
        </h2>

        {message && (
          <div className="alert alert-info text-center" role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          {Object.keys(formData).map((field) =>
            field !== "role" ? (
              <div className="mb-4" key={field}>
                <label className="form-label text-light" style={{ fontSize: "14px", fontWeight: "500" }}>
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  className="form-control bg-dark text-white border-secondary"
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  style={{
                    height: "45px",
                    borderRadius: "10px",
                    fontSize: "16px",
                  }}
                />
              </div>
            ) : null
          )}

          {/* Role select */}
          <div className="mb-4">
            <label className="form-label text-light" style={{ fontSize: "14px", fontWeight: "500" }}>
              Role
            </label>
            <select
              name="role"
              className="form-select bg-dark text-white border-secondary"
              value={formData.role}
              onChange={handleChange}
              required
              style={{
                height: "45px",
                borderRadius: "10px",
                fontSize: "16px",
              }}
            >
              <option value="Distributor">Distributor</option>
              <option value="Receiver">Receiver</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn w-100 py-2"
            style={{
              fontSize: "18px",
              borderRadius: "10px",
              fontWeight: "500",
              backgroundColor: "#A67B5B", // Light brown color
            }}
          >
            Register
          </button>
        </form>

        <div className="text-center mt-3">
          <p style={{ fontSize: "14px", color: "#ddd" }}>
            Already have an account?{" "}
            <a href="/login" style={{ color: "#007bff" }}>
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
