import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios";
import { validateToken } from "../utils/tokenValidation";

function ReceiverPage() {
  const [examPapers, setExamPapers] = useState([]);
  const navigate = useNavigate(); // Hook to navigate
  const token = localStorage.getItem("access_token");
  const storedUser = validateToken(token);
  console.log('examPapers', examPapers)
  useEffect(()=>{
    console.log('storedUser', storedUser);
    if(!storedUser ||( storedUser.role !== "Receiver")){
      localStorage.removeItem("access_token")
      navigate("/login")
    }
  },
  [storedUser, token])

  useEffect(() => {
    const fetchExams = async () => {

      try {
        const res = await axios.get(
          `http://127.0.0.1:5000/get-exams?receiverId=${storedUser.receiverId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setExamPapers(res.data.exams || []);
      } catch (err) {
        console.error("Failed to fetch exams", err);
      }
    };

    fetchExams();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login page
  };

  const styles = {
    pageWrapper: {
      minHeight: "100vh",
      backgroundImage: `url("/image.png")`, // Full background (optional)
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      fontFamily: "Segoe UI, sans-serif",
      color: "#4e342e",
      padding: "20px",
    },
    container: {
      backgroundColor: "rgba(243, 229, 220, 0.95)",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      width: "90%",
      maxWidth: "600px",
      textAlign: "center",
    },
    heading: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#3e2723",
    },
    examPaper: {
      backgroundColor: "#fffaf5",
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "15px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      textAlign: "left",
    },
    downloadLink: {
      display: "inline-block",
      marginTop: "8px",
      color: "#795548",
      textDecoration: "none",
      fontWeight: "600",
    },
    logoutButton: {
      marginTop: "20px",
      padding: "10px 20px",
      backgroundColor: "#795548",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background 0.3s",
    },
    logoutButtonHover: {
      backgroundColor: "#5d4037",
    },
  };

  const handleDownload = async (filename) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      
      // Verify token first
      const currentUser = validateToken(accessToken); // Using our reusable function
      
      // Create download URL with authorization
      const response = await axios.get(
        `http://127.0.0.1:5000/download/${filename}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          responseType: 'blob' // Important for file downloads
        }
      );
  
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
    } catch (error) {
      console.error("Download failed:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("access_token");
        navigate("/login");
      }
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Your Assigned Exam Papers</h2>

        {examPapers.length === 0 ? (
          <p>No papers assigned.</p>
        ) : (
          examPapers.map((exam, index) => (
            <div key={index} style={styles.examPaper}>
              <p><strong>Receiver:</strong> {exam.receiver?.username}</p>
              {exam.files?.map((file) => (
                <div key={file.filename}>
                  <button 
                    onClick={() => handleDownload(file.filename)}
                    style={styles.downloadLink}
                  >
                    Download {file.setName} : {file.filename}
                  </button>
                </div>
              ))}
            </div>
          ))
        )}
        <button
          style={styles.logoutButton}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.logoutButtonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.logoutButton.backgroundColor)}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ReceiverPage;
