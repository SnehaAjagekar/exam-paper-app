import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from './layout/DashboardLayout';
import { validateToken } from '../utils/tokenValidation';
import { FaDownload, FaFileAlt, FaUser, FaCalendarAlt, FaEye } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

const ReceiverPage = () => {
  const [examPapers, setExamPapers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const fetchExamPapers = useCallback(async (storedUser) => {
    if (!storedUser) return;
    
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.get(
        `${API_BASE_URL}/get-exams?receiverId=${storedUser.receiverId}`,
        { 
          headers: { 
            Authorization: `Bearer ${accessToken}` 
          } 
        }
      );
      
      console.log('examPapers response:', response.data);
      setExamPapers(response.data.exams || []);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch exam papers:", error);
      setError(error.response?.data?.message || "Failed to fetch exam papers");
      
      if (error.response?.status === 401) {
        localStorage.removeItem("access_token");
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const storedUser = validateToken(accessToken);
    
    if (!storedUser || storedUser.role !== "Receiver") {
      localStorage.removeItem("access_token");
      navigate("/login");
      return;
    }
    
    setUser(storedUser);
    fetchExamPapers(storedUser);
  }, [navigate, fetchExamPapers]);

  const handleDownload = async (filename) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.get(
        `${API_BASE_URL}/download/${filename}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          responseType: 'blob'
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed: " + (error.response?.data?.message || error.message));
      
      if (error.response?.status === 401) {
        localStorage.removeItem("access_token");
        navigate("/login");
      }
    }
  };

  const totalFiles = examPapers.reduce((acc, exam) => acc + (exam.files?.length || 0), 0);
  const uniqueSubjects = new Set(examPapers.map(exam => exam.subject)).size;

  return (
    <DashboardLayout>
      <div className="row">
        <div className="col-12 mb-4">
          <h2 className="mb-1">Your Assigned Exam Papers</h2>
          <p className="text-muted">Download exam papers assigned to your receiver ID: <strong>{user?.receiverId}</strong></p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card border-primary">
            <div className="card-body text-center">
              <FaFileAlt className="text-primary mb-2" size={24} />
              <h4 className="text-primary mb-1">{examPapers.length}</h4>
              <small className="text-muted">Exam Sets</small>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-info">
            <div className="card-body text-center">
              <FaDownload className="text-info mb-2" size={24} />
              <h4 className="text-info mb-1">{totalFiles}</h4>
              <small className="text-muted">Total Files</small>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-success">
            <div className="card-body text-center">
              <FaUser className="text-success mb-2" size={24} />
              <h4 className="text-success mb-1">{user?.receiverId || 'N/A'}</h4>
              <small className="text-muted">Receiver ID</small>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-warning">
            <div className="card-body text-center">
              <FaCalendarAlt className="text-warning mb-2" size={24} />
              <h4 className="text-warning mb-1">{uniqueSubjects}</h4>
              <small className="text-muted">Subjects</small>
            </div>
          </div>
        </div>
      </div>

      {/* Exam Papers */}
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">
                <FaFileAlt className="me-2" />
                Available Exam Papers
              </h5>
              <button 
                className="btn btn-light btn-sm"
                onClick={() => fetchExamPapers(user)}
                disabled={isLoading}
              >
                <FaEye className="me-1" />
                Refresh
              </button>
            </div>
            <div className="card-body">
              {isLoading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2 text-muted">Loading exam papers...</p>
                </div>
              ) : error ? (
                <div className="alert alert-danger" role="alert">
                  <strong>Error:</strong> {error}
                  <button 
                    className="btn btn-outline-danger btn-sm ms-2" 
                    onClick={() => fetchExamPapers(user)}
                  >
                    Retry
                  </button>
                </div>
              ) : examPapers.length === 0 ? (
                <div className="text-center py-4">
                  <FaFileAlt className="text-muted mb-3" size={48} />
                  <h5 className="text-muted">No Exam Papers Assigned</h5>
                  <p className="text-muted">There are currently no exam papers assigned to your receiver ID.</p>
                </div>
              ) : (
                <div className="row">
                  {examPapers.map((exam, index) => (
                    <div key={index} className="col-md-6 col-lg-4 mb-4">
                      <div className="card h-100 border-primary">
                        <div className="card-header bg-light">
                          <h6 className="card-title mb-0">
                            <FaFileAlt className="text-primary me-2" />
                            {exam.subject || `Exam Set ${index + 1}`}
                          </h6>
                          {exam.receiver?.username && (
                            <small className="text-muted">
                              Assigned to: {exam.receiver.username}
                            </small>
                          )}
                        </div>
                        <div className="card-body">
                          {exam.files && exam.files.length > 0 ? (
                            <div className="d-grid gap-2">
                              {exam.files.map((file, fileIndex) => (
                                <button
                                  key={fileIndex}
                                  className="btn btn-outline-success btn-sm d-flex align-items-center justify-content-between"
                                  onClick={() => handleDownload(file.filename)}
                                  title={`Download ${file.filename}`}
                                >
                                  <span className="text-truncate">
                                    <strong>{file.setName}</strong>
                                  </span>
                                  <FaDownload className="ms-2" />
                                </button>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted mb-0">No files available</p>
                          )}
                        </div>
                        <div className="card-footer bg-light text-center">
                          <small className="text-muted">
                            {exam.files?.length || 0} file(s) available
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReceiverPage;