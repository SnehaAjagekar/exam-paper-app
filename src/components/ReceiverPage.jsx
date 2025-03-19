import { useState } from "react";
import { FaSignOutAlt, FaEye } from "react-icons/fa";

export default function ReceiverPage() {
  const [subject, setSubject] = useState("Mathematics"); // Example subject

  const handleViewSet = (setName) => {
    alert(`Viewing ${setName}`); // Replace this with actual file viewing logic
  };

  return (
    <div className="container d-flex flex-column align-items-center vh-100">
      <div className="card shadow-lg p-4 mt-4 w-50 text-center">
        {/* Header with Logout */}
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="fw-bold">Receiver</h3>
          <button className="btn btn-danger d-flex align-items-center">
            <FaSignOutAlt className="me-2" /> Logout
          </button>
        </div>

        {/* Subject Name Display */}
        <div className="mt-3">
          <h5 className="fw-bold">Subject: {subject}</h5>
        </div>

        {/* View Set Buttons */}
        <div className="mt-4">
          {["Set A", "Set B", "Set C"].map((setName, index) => (
            <button
              key={index}
              className="btn btn-primary w-100 my-2 d-flex align-items-center justify-content-center"
              onClick={() => handleViewSet(setName)}
            >
              <FaEye className="me-2" /> View {setName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
