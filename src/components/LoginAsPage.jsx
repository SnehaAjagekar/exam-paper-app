import React from "react";
import { useNavigate } from "react-router-dom";

const LoginAsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column align-items-center vh-100 justify-content-center">
      <h2 className="mb-3">Login As</h2>
      <button className="btn btn-primary m-2" onClick={() => navigate("/login?role=Distributor")}>Login as Distributor</button>
      <button className="btn btn-secondary m-2" onClick={() => navigate("/login?role=Receiver")}>Login as Receiver</button>
    </div>
  );
};

export default LoginAsPage;
