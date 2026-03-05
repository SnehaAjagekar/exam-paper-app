import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from './layout/DashboardLayout';
import { validateToken } from '../utils/tokenValidation';
import { FaHistory, FaFileAlt, FaCalendarAlt, FaUser, FaEye, FaDownload } from 'react-icons/fa';

const History = () => {
  const [uploadHistory, setUploadHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const fetchUploadHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      // Mock data for now - replace with actual API call
      const mockHistory = [
        {
          id: 1,
          subject: "Computer Graphics",
          receiverId: "REC001",
          uploadDate: "2024-01-15",
          files: ["CG_SetA.pdf", "CG_SetB.pdf"],
          status: "Completed"
        },
        {
          id: 2,
          subject: "Software Engineering",
          receiverId: "REC002", 
          uploadDate: "2024-01-12",
          files: ["SE_SetA.pdf", "SE_SetB.pdf", "SE_SetC.pdf"],
          status: "Completed"
        },
        {
          id: 3,
          subject: "Data Structures",
          receiverId: "REC001",
          uploadDate: "2024-01-10",
          files: ["DS_SetA.pdf"],
          status: "Pending"
        }
      ];
      
      setUploadHistory(mockHistory);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch upload history:", error);
      setError("Failed to fetch upload history");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const storedUser = validateToken(accessToken);
    
    if (!storedUser) {
      localStorage.removeItem("access_token");
      navigate("/login");
      return;
    }
    
    setUser(storedUser);
    fetchUploadHistory();
  }, [navigate, fetchUploadHistory]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed': return 'bg-success';
      case 'Pending': return 'bg-warning';
      case 'Failed': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const totalUploads = uploadHistory.length;
  const completedUploads = uploadHistory.filter(item => item.status === 'Completed').length;
  const pendingUploads = uploadHistory.filter(item => item.status === 'Pending').length;
  const totalFiles = uploadHistory.reduce((acc, item) => acc + item.files.length, 0);

  return (
    <DashboardLayout>
      <div className="row">
        <div className="col-12 mb-4">
          <h2 className="mb-1">Upload History</h2>
          <p className="text-muted">Track all your exam paper uploads and their status</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card border-primary">
            <div className="card-body text-center">
              <FaHistory className="text-primary mb-2" size={24} />
              <h4 className="text-primary mb-1">{totalUploads}</h4>
              <small className="text-muted">Total Uploads</small>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-success">
            <div className="card-body text-center">
              <FaFileAlt className="text-success mb-2" size={24} />
              <h4 className="text-success mb-1">{completedUploads}</h4>
              <small className="text-muted">Completed</small>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-warning">
            <div className="card-body text-center">
              <FaCalendarAlt className="text-warning mb-2" size={24} />
              <h4 className="text-warning mb-1">{pendingUploads}</h4>
              <small className="text-muted">Pending</small>
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
      </div>

      {/* Upload History Table */}
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">
                <FaHistory className="me-2" />
                Recent Uploads
              </h5>
              <button 
                className="btn btn-light btn-sm"
                onClick={fetchUploadHistory}
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
                  <p className="mt-2 text-muted">Loading upload history...</p>
                </div>
              ) : error ? (
                <div className="alert alert-danger" role="alert">
                  <strong>Error:</strong> {error}
                  <button 
                    className="btn btn-outline-danger btn-sm ms-2" 
                    onClick={fetchUploadHistory}
                  >
                    Retry
                  </button>
                </div>
              ) : uploadHistory.length === 0 ? (
                <div className="text-center py-4">
                  <FaHistory className="text-muted mb-3" size={48} />
                  <h5 className="text-muted">No Upload History</h5>
                  <p className="text-muted">You haven't uploaded any exam papers yet.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Subject</th>
                        <th>Receiver ID</th>
                        <th>Upload Date</th>
                        <th>Files</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {uploadHistory.map((upload) => (
                        <tr key={upload.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <FaFileAlt className="text-primary me-2" />
                              <strong>{upload.subject}</strong>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-info">
                              <FaUser className="me-1" />
                              {upload.receiverId}
                            </span>
                          </td>
                          <td>
                            <small className="text-muted">
                              {new Date(upload.uploadDate).toLocaleDateString()}
                            </small>
                          </td>
                          <td>
                            <span className="badge bg-secondary">
                              {upload.files.length} file(s)
                            </span>
                            <div className="small text-muted mt-1">
                              {upload.files.slice(0, 2).map((file, index) => (
                                <div key={index}>{file}</div>
                              ))}
                              {upload.files.length > 2 && (
                                <div>+{upload.files.length - 2} more...</div>
                              )}
                            </div>
                          </td>
                          <td>
                            <span className={`badge ${getStatusBadge(upload.status)}`}>
                              {upload.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-outline-primary btn-sm me-2"
                              title="View Details"
                            >
                              <FaEye />
                            </button>
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              title="Re-upload"
                              disabled={upload.status === 'Pending'}
                            >
                              <FaFileAlt />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default History;