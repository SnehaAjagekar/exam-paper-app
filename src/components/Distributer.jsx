import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import { validateToken } from '../utils/tokenValidation';
import { FaUpload, FaFileAlt, FaUser, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import '../styles/distributor.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://13.60.2.120:5000";

const Distributer = () => {
  const [receiverId, setReceiverId] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [files, setFiles] = useState({
    setA: null,
    setB: null,
    setC: null,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const storedUser = validateToken(accessToken);
    
    if (!storedUser || storedUser.role !== "Distributor") {
      localStorage.removeItem("access_token");
      navigate("/login");
      return;
    }
    
    setUser(storedUser);
  }, [navigate]);

  const handleFileChange = (event) => {
    const { name, files: fileList } = event.target;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: fileList[0],
    }));
  };

  const handleUpload = async () => {
    const accessToken = localStorage.getItem("access_token");
    
    if (!accessToken) {
      setUploadMessage('No access token found!');
      return;
    }

    if (!receiverId || !subjectName) {
      setUploadMessage('Please fill in all required fields!');
      return;
    }

    setIsUploading(true);
    setUploadMessage('');
    
    try {
      validateToken(accessToken);
      
      const formData = new FormData();
      formData.append("subject", subjectName);
      formData.append("receiverId", receiverId);

      if (files.setA) formData.append("setA", files.setA);
      if (files.setB) formData.append("setB", files.setB);
      if (files.setC) formData.append("setC", files.setC);

      const response = await axios.post(`${API_BASE_URL}/upload-exam`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${accessToken}`
        }
      });
      
      console.log("Upload successful", response.data);
      setUploadMessage('Upload Successful!');
      
      // Reset form
      setTimeout(() => {
        setReceiverId('');
        setSubjectName('');
        setFiles({ setA: null, setB: null, setC: null });
        setUploadMessage('');
      }, 2000);
      
    } catch (error) {
      setUploadMessage(`Upload failed: ${error.response?.data?.message || error.message}`);
      console.error("Upload failed:", error.response?.data || error.message);
      if (error.message.includes("Token")) {
        localStorage.removeItem("access_token");
        navigate("/login");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="distributor-container">
        <div className="distributor-header fade-in-up">
          <div className="header-content">
            <h1 className="page-title">Upload Exam Papers</h1>
            <p className="page-subtitle">Complete the upload form with exam papers for Sets A, B, and C</p>
          </div>
        </div>

        <div className="distributor-content fade-in-up fade-in-up-1">
          <div className="distributor-form-section">
            <form onSubmit={(e) => { e.preventDefault(); handleUpload(); }}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    <FaUser className="label-icon" />
                    Receiver ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., REC001"
                    value={receiverId}
                    onChange={(e) => setReceiverId(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FaFileAlt className="label-icon" />
                    Subject Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., Database Systems"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="file-sets">
                <div className="file-set">
                  <div className="file-set-header primary">
                    <h3>Set A</h3>
                  </div>
                  <div className="file-set-body">
                    <label htmlFor="setA" className="file-upload-box">
                      <input
                        id="setA"
                        type="file"
                        name="setA"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        hidden
                      />
                      <FaUpload className="upload-icon" />
                      <p>Click to upload or drag & drop</p>
                      <span className="file-hint">PDF, DOC, DOCX up to 10MB</span>
                      {files.setA && (
                        <div className="file-selected">
                          <FaCheckCircle />
                          {files.setA.name}
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="file-set">
                  <div className="file-set-header success">
                    <h3>Set B</h3>
                  </div>
                  <div className="file-set-body">
                    <label htmlFor="setB" className="file-upload-box">
                      <input
                        id="setB"
                        type="file"
                        name="setB"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        hidden
                      />
                      <FaUpload className="upload-icon" />
                      <p>Click to upload or drag & drop</p>
                      <span className="file-hint">PDF, DOC, DOCX up to 10MB</span>
                      {files.setB && (
                        <div className="file-selected">
                          <FaCheckCircle />
                          {files.setB.name}
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="file-set">
                  <div className="file-set-header warning">
                    <h3>Set C</h3>
                  </div>
                  <div className="file-set-body">
                    <label htmlFor="setC" className="file-upload-box">
                      <input
                        id="setC"
                        type="file"
                        name="setC"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        hidden
                      />
                      <FaUpload className="upload-icon" />
                      <p>Click to upload or drag & drop</p>
                      <span className="file-hint">PDF, DOC, DOCX up to 10MB</span>
                      {files.setC && (
                        <div className="file-selected">
                          <FaCheckCircle />
                          {files.setC.name}
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              {uploadMessage && (
                <div className={`form-alert ${uploadMessage.includes('Success') ? 'success' : 'error'}`}>
                  {uploadMessage}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary"
                disabled={isUploading || !files.setA}
                style={{ width: '100%', marginTop: '1.5rem' }}
              >
                {isUploading ? (
                  <>
                    <span className="spinner" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <FaUpload />
                    Upload Papers
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="distributor-guidelines fade-in-up fade-in-up-2">
            <div className="guidelines-card">
              <h3 className="guidelines-title">
                <FaInfoCircle /> Upload Guidelines
              </h3>
              <ol className="guidelines-list">
                <li>Enter the receiver's ID accurately</li>
                <li>Select the subject being uploaded</li>
                <li>Upload exam papers for Sets A, B, and C</li>
                <li>Ensure files are in PDF, DOC, or DOCX format</li>
                <li>Maximum file size: 10MB per file</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Distributer;
