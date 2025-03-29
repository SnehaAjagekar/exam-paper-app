import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ReceiverPage() {
  const navigate = useNavigate();
  const [examPapers, setExamPapers] = useState([]);
  const [message, setMessage] = useState("Loading...");
  
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Decode JWT to extract receiverId (backend should send it in payload)
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const receiverId = decodedToken.receiverId; // 🔥 Backend should send receiverId in JWT payload

    axios
      .get(`http://127.0.0.1:5000/get-exams?receiverId=${receiverId}`, {
        headers: { Authorization: `Bearer ${token}` }, // Attach JWT token
      })
      .then((response) => {
        if (response.data.length === 0) {
          setMessage("No exam papers assigned yet.");
        } else {
          setExamPapers(response.data);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setMessage("Unauthorized! Please log in again.");
          localStorage.removeItem("access_token");
          navigate("/login");
        } else {
          setMessage("Failed to fetch exam papers. Try again later.");
        }
      });
  }, [navigate]);

  return (
    <div className="container mt-4">
      <h2>Receiver Dashboard</h2>

      {examPapers.length === 0 ? (
        <div className="alert alert-info mt-3">{message}</div>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Set A</th>
              <th>Set B</th>
              <th>Set C</th>
            </tr>
          </thead>
          <tbody>
            {examPapers.map((exam, index) => (
              <tr key={index}>
                <td>{exam.subject}</td>
                <td>
                  {exam.setA ? (
                    <a href={exam.setA} download className="btn btn-success">
                      Download
                    </a>
                  ) : (
                    "Not Available"
                  )}
                </td>
                <td>
                  {exam.setB ? (
                    <a href={exam.setB} download className="btn btn-success">
                      Download
                    </a>
                  ) : (
                    "Not Available"
                  )}
                </td>
                <td>
                  {exam.setC ? (
                    <a href={exam.setC} download className="btn btn-success">
                      Download
                    </a>
                  ) : (
                    "Not Available"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
