import React from "react";
import { useNavigate } from "react-router-dom";

const LoginAsPage = () => {
  const navigate = useNavigate();

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
        className="text-center p-4"
        style={{
          backgroundColor: "rgba(252, 244, 244, 0.85)",
          borderRadius: "16px",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="login-icon"
          style={{ width: "100px", marginBottom: "20px" }}
        />

        <h2 className="mb-4" style={{ fontWeight: "bold", color: "#4b2e1d" }}>
          Login As
        </h2>

        <button
          className="btn mb-3"
          style={{
            backgroundColor: "#a27045",
            color: "#fff",
            fontWeight: "500",
            width: "220px",
          }}
          onClick={() => navigate("/login?role=Distributor")}
        >
          Login as Distributor
        </button>

        <br />

        <button
          className="btn"
          style={{
            backgroundColor: "#c49b6c",
            color: "#fff",
            fontWeight: "500",
            width: "220px",
          }}
          onClick={() => navigate("/login?role=Receiver")}
        >
          Login as Receiver
        </button>
      </div>
    </div>
  );
};

export default LoginAsPage;
