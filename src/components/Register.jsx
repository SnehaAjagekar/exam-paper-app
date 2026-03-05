import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaUser, FaEnvelope, FaLock, FaPhone, FaBuilding, FaIdCard, FaUserTie } from "react-icons/fa";
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/register", formData, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage(response.data.message);
      setTimeout(() => navigate("/loginAs"), 1000);
    } catch (error) {
      setMessage(error.response ? error.response.data.message : "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldIcon = (field) => {
    const iconMap = {
      collegeName: FaBuilding,
      fullName: FaUser,
      distributorReceiverId: FaIdCard,
      phoneNumber: FaPhone,
      email: FaEnvelope,
      username: FaUser,
      password: FaLock,
    };
    return iconMap[field] || FaUser;
  };

  const getFieldLabel = (field) => {
    const labelMap = {
      collegeName: "College Name",
      fullName: "Full Name",
      distributorReceiverId: "Distributor/Receiver ID",
      phoneNumber: "Phone Number",
      email: "Email Address",
      username: "Username",
      password: "Password",
    };
    return labelMap[field] || field.replace(/([A-Z])/g, " $1");
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white text-center py-4">
                <FaUserPlus size={48} className="mb-3" />
                <h2 className="mb-0" style={{ fontSize: "28px", fontWeight: "600" }}>
                  Create Account
                </h2>
                <p className="mb-0 mt-2 opacity-75">Join the ExamPortal community</p>
              </div>

              <div className="card-body p-5">
                {message && (
                  <div 
                    className={`alert text-center ${
                      message.includes('successful') || message.includes('created') 
                        ? 'alert-success' 
                        : 'alert-danger'
                    }`} 
                    role="alert"
                  >
                    {message}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {Object.keys(formData).map((field) =>
                      field !== "role" ? (
                        <div className="col-md-6 mb-3" key={field}>
                          <label className="form-label">
                            {React.createElement(getFieldIcon(field), { className: "me-2 text-primary" })}
                            {getFieldLabel(field)}
                            <span className="text-danger"> *</span>
                          </label>
                          <input
                            type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                            name={field}
                            className="form-control"
                            value={formData[field]}
                            onChange={handleChange}
                            required
                            placeholder={`Enter your ${getFieldLabel(field).toLowerCase()}`}
                          />
                        </div>
                      ) : null
                    )}

                    {/* Role select */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        <FaUserTie className="me-2 text-primary" />
                        Role
                        <span className="text-danger"> *</span>
                      </label>
                      <select
                        name="role"
                        className="form-select"
                        value={formData.role}
                        onChange={handleChange}
                        required
                      >
                        <option value="Distributor">Distributor</option>
                        <option value="Receiver">Receiver</option>
                      </select>
                    </div>
                  </div>

                  <div className="d-grid mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <FaUserPlus className="me-2" />
                          Create Account
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="text-center mt-4 pt-3 border-top">
                  <p className="text-muted mb-0">
                    Already have an account?{" "}
                    <a href="/loginAs" className="text-decoration-none">
                      Sign in here
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
