import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateToken } from "../utils/tokenValidation";
import { FaUserTie, FaUserGraduate, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginAsPage = () => {
  const navigate = useNavigate();
          
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const storedUser = validateToken(token);
    
    console.log('storedUser', storedUser);
    if(storedUser && typeof storedUser === 'object' && storedUser.role === "Receiver"){
      navigate("/receiver")
    } else if(storedUser && typeof storedUser === 'object' && storedUser.role === "Distributor"){
      navigate("/distributor")
    }
  }, [navigate]);

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-xl-5">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white text-center py-4">
                <FaSignInAlt size={48} className="mb-3" />
                <h2 className="mb-0" style={{ fontSize: "28px", fontWeight: "600" }}>
                  ExamPortal
                </h2>
                <p className="mb-0 mt-2 opacity-75">Choose your role to continue</p>
              </div>

              <div className="card-body p-5">
                <div className="row g-3">
                  {/* Distributor Card */}
                  <div className="col-12">
                    <div 
                      className="card border-primary h-100"
                      style={{ 
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                      }}
                      onClick={() => navigate("/login?role=Distributor")}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f8f9fa";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "white";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div className="card-body text-center py-4">
                        <FaUserTie size={32} className="text-primary mb-3" />
                        <h5 className="card-title mb-2">Distributor</h5>
                        <p className="card-text text-muted small mb-0">
                          Upload and manage exam papers
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Receiver Card */}
                  <div className="col-12">
                    <div 
                      className="card border-success h-100"
                      style={{ 
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                      }}
                      onClick={() => navigate("/login?role=Receiver")}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f8f9fa";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "white";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div className="card-body text-center py-4">
                        <FaUserGraduate size={32} className="text-success mb-3" />
                        <h5 className="card-title mb-2">Receiver</h5>
                        <p className="card-text text-muted small mb-0">
                          Access and download assigned papers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-4 pt-3 border-top">
                  <p className="text-muted mb-0">
                    Don't have an account?{" "}
                    <a href="/register" className="text-decoration-none">
                      <FaUserPlus className="me-1" />
                      Create Account
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

export default LoginAsPage;
