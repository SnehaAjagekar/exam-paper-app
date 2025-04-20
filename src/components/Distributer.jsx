import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // for logout redirect
import { validateToken } from '../utils/tokenValidation';

const Distributer = () => {
  const [receiverId, setReceiverId] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [files, setFiles] = useState({
    setA: null,
    setB: null,
    setC: null,
  });

  const navigate = useNavigate(); // Hook for navigation
  const accessToken = localStorage.getItem("access_token");
  const storedUser = validateToken(accessToken);

  useEffect(()=>{
    if(!storedUser ||( storedUser.role !== "Distributor")){
      localStorage.removeItem("access_token")
      navigate("/login")
    }
  },
  [storedUser, accessToken])
  // Handle file input changes
  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: files[0],
    }));
  };

  const handleUpload = async () => {
    
    if (!accessToken) {
      console.error("No access token found!");
      return;
    }
  
    // Verify token structure
    try {
     validateToken(accessToken);
      
      // Continue with your upload logic
      const formData = new FormData();
      // formData.append("receiverId", currentUser.receiverId);
      formData.append("receiverName", receiverName);
      formData.append("receiverId", receiverId);

  
      // Only append files if they exist
      if (files.setA) formData.append("setA", files.setA);
      if (files.setB) formData.append("setB", files.setB);
      if (files.setC) formData.append("setC", files.setC);
  
      const response = await axios.post("http://127.0.0.1:5000/upload-exam", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${accessToken}`
        }
      });
      console.log("Upload successful", response.data);
      
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      if (error.message.includes("Token")) {
        localStorage.removeItem("access_token");
        navigate("/login");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login
  };

  // Brownish UI styles
  const styles = {
    pageWrapper: {
      minHeight: "100vh",
      backgroundImage: `url("/image.png")`, // Full background
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
      backgroundColor: 'rgba(243, 229, 220, 0.95)',
      borderRadius: '12px',
      padding: '30px',
      width: '90%',
      maxWidth: '500px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      textAlign: "center",
      marginTop: "20px",
    },
    heading: {
      marginBottom: '24px',
      fontWeight: 'bold',
      color: '#3e2723',
      fontSize: '28px',
    },
    input: {
      display: 'block',
      width: '100%',
      padding: '10px',
      marginBottom: '16px',
      borderRadius: '8px',
      border: '1px solid #a1887f',
      backgroundColor: '#fffaf5',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#795548',
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '18px',
      fontWeight: '600',
      transition: 'background 0.3s',
      marginTop: '10px',
    },
    buttonHover: {
      backgroundColor: '#5d4037',
    },
    logoutButton: {
      padding: "10px 20px",
      backgroundColor: "#8d6e63",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background 0.3s",
      marginBottom: "20px",
    },
    logoutButtonHover: {
      backgroundColor: "#6d4c41",
    }
  };

  return (
    <div style={styles.pageWrapper}>
    

      <div style={styles.container}>
        <h2 style={styles.heading}>Upload Exam Paper</h2>

        <input
          type="text"
          placeholder="Receiver ID"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Receiver Name"
          value={receiverName}
          onChange={(e) => setReceiverName(e.target.value)}
          style={styles.input}
        />
        <input
          type="file"
          name="setA"
          onChange={handleFileChange}
          style={styles.input}
        />
        <input
          type="file"
          name="setB"
          onChange={handleFileChange}
          style={styles.input}
        />
        <input
          type="file"
          name="setC"
          onChange={handleFileChange}
          style={styles.input}
        />

        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          onClick={handleUpload}
        >
          Upload
        </button>
       
      </div>
      <br></br>
      <button
        style={styles.logoutButton}
        onMouseOver={(e) => (e.target.style.backgroundColor = styles.logoutButtonHover.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = styles.logoutButton.backgroundColor)}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Distributer;
