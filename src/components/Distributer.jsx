import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DistributorPage() {
  const navigate = useNavigate();
  const [receiverId, setReceiverId] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [files, setFiles] = useState({ setA: null, setB: null, setC: null });
  const [message, setMessage] = useState("");

  const handleFileChange = (e, setName) => {
    const file = e.target.files[0];
    if (file) {
      setFiles({ ...files, [setName]: file });
    }
  };

  const handleUpload = async () => {
    if (!receiverId || !receiverName) {
      setMessage("Please enter all details!");
      return;
    }

    const token = localStorage.getItem("access_token");
    console.log("Token:", token);
    if (!token) {
      setMessage("Unauthorized! Please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("receiverId", receiverId);
    formData.append("receiverName", receiverName);

    if (files.setA) formData.append("setA", files.setA);
    if (files.setB) formData.append("setB", files.setB);
    if (files.setC) formData.append("setC", files.setC);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload-exam", formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      setMessage(response.data.message || "Exam papers uploaded successfully!");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage("Unauthorized! Please log in again.");
        localStorage.removeItem("access_token");
        navigate("/login");
      } else {
        setMessage(error.response?.data?.message || "Upload failed! Try again.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Distributor</h2>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      {message && <div className="alert alert-info mt-3">{message}</div>}

      <div className="mt-3">
        <label className="form-label fw-bold">Receiver ID:</label>
        <input
          type="text"
          className="form-control"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          placeholder="Enter Receiver ID"
          required
        />
      </div>

      <div className="mt-3">
        <label className="form-label fw-bold">Receiver Name:</label>
        <input
          type="text"
          className="form-control"
          value={receiverName}
          onChange={(e) => setReceiverName(e.target.value)}
          placeholder="Enter Receiver Name"
          required
        />
      </div>

      <div className="mt-4">
        {"setA setB setC".split(" ").map((setName, index) => (
          <div key={index} className="mb-3">
            <label className="fw-bold">Upload {setName}:</label>
            <input
              type="file"
              className="form-control"
              accept="application/pdf"
              onChange={(e) => handleFileChange(e, setName)}
            />
          </div>
        ))}
      </div>

      <button className="btn btn-primary mt-3 w-100" onClick={handleUpload}>
        Upload Papers
      </button>
    </div>
  );
}
