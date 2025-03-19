import { useState } from "react";

export default function DistributorPage() {
  const [subject, setSubject] = useState("");

  const handleFileUpload = (e, setName) => {
    const file = e.target.files[0];
    if (file) {
      alert(`${setName} uploaded: ${file.name}`);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Distributor</h2>
        <button className="btn btn-danger">Logout</button>
      </div>

      <div className="mt-3">
        <label className="form-label fw-bold">Subject Name:</label>
        <input
          type="text"
          className="form-control"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter Subject"
        />
      </div>

      <div className="mt-4">
        {["Set A", "Set B", "Set C"].map((setName, index) => (
          <div key={index} className="mb-3">
            <label className="fw-bold">{setName}:</label>
            <input
              type="file"
              className="form-control"
              accept="application/pdf"
              onChange={(e) => handleFileUpload(e, setName)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
