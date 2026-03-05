import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import { validateToken } from '../utils/tokenValidation';
import { FaUpload, FaFileAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Distributer = () => {
  const [receiverId, setReceiverId] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [files, setFiles] = useState({
    setA: null,
    setB: null,
    setC: null,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

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
    const { name, files } = event.target;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: files[0],
    }));
  };

  const handleUpload = async () => {
    const accessToken = localStorage.getItem("access_token");
    
    if (!accessToken) {
      alert("No access token found!");
      return;
    }

    if (!receiverId || !subjectName) {
      alert("Please fill in all required fields!");
      return;
    }

    setIsUploading(true);
    try {
      validateToken(accessToken);
      
      const formData = new FormData();
      formData.append("subject", subjectName);
      formData.append("receiverId", receiverId);

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
      alert("Upload Successful!");
      
      // Reset form
      setReceiverId('');
      setSubjectName('');
      setFiles({ setA: null, setB: null, setC: null });
      
    } catch (error) {
      alert(`Upload failed: ${error.response?.data?.message || error.message}`);
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
      <div className="row">
        <div className="col-12 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-1">Upload Exam Papers</h2>
              <p className="text-muted">Upload exam papers and assign them to receivers</p>
            </div>
            <div>
              <button 
                className="btn btn-outline-danger"
                onClick={handleLogout}
                title="Logout"
              >
                <FaSignOutAlt className="me-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Upload Form */}
        <div className="col-lg-8 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">
                <FaUpload className="me-2" />
                New Upload
              </h5>
            </div>
            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      <FaUser className="me-1" />
                      Receiver ID *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter receiver ID"
                      value={receiverId}
                      onChange={(e) => setReceiverId(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      <FaFileAlt className="me-1" />
                      Subject Name *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter subject name"
                      value={subjectName}
                      onChange={(e) => setSubjectName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Set A</label>
                  <input
                    type="file"
                    name="setA"
                    className="form-control"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                  />
                  {files.setA && (
                    <small className="text-success">Selected: {files.setA.name}</small>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Set B</label>
                  <input
                    type="file"
                    name="setB"
                    className="form-control"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                  />
                  {files.setB && (
                    <small className="text-success">Selected: {files.setB.name}</small>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label">Set C</label>
                  <input
                    type="file"
                    name="setC"
                    className="form-control"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                  />
                  {files.setC && (
                    <small className="text-success">Selected: {files.setC.name}</small>
                  )}
                </div>

                <div className="d-grid">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={handleUpload}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FaUpload className="me-2" />
                        Upload Papers
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Upload Guidelines */}
        <div className="col-lg-4 mb-4">
          <div className="card border-info">
            <div className="card-header bg-info text-white">
              <h6 className="card-title mb-0">Upload Guidelines</h6>
            </div>
            <div className="card-body">
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <i className="text-info">•</i> Maximum file size: 10MB per file
                </li>
                <li className="mb-2">
                  <i className="text-info">•</i> Supported formats: PDF, DOC, DOCX
                </li>
                <li className="mb-2">
                  <i className="text-info">•</i> Ensure receiver ID is correct
                </li>
                <li className="mb-2">
                  <i className="text-info">•</i> Use clear subject names
                </li>
                <li className="mb-0">
                  <i className="text-info">•</i> At least one set must be uploaded
                </li>
              </ul>
            </div>
          </div>

          <div className="card mt-3 border-success">
            <div className="card-header bg-success text-white">
              <h6 className="card-title mb-0">Quick Stats</h6>
            </div>
            <div className="card-body text-center">
              <div className="row">
                <div className="col-6">
                  <h4 className="text-primary mb-1">12</h4>
                  <small className="text-muted">Total Uploads</small>
                </div>
                <div className="col-6">
                  <h4 className="text-success mb-1">8</h4>
                  <small className="text-muted">This Month</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Distributer;
