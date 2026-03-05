import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import { validateToken } from '../utils/tokenValidation';
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaIdCard, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    collegeName: '',
    username: '',
    role: '',
    distributorReceiverId: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const loadProfileData = useCallback((storedUser) => {
    // For now, use mock data based on stored user
    // In a real app, you'd fetch this from your API
    setProfileData({
      fullName: storedUser?.fullName || 'John Doe',
      email: storedUser?.email || 'john.doe@example.com',
      phoneNumber: storedUser?.phoneNumber || '+1-234-567-8900',
      collegeName: storedUser?.collegeName || 'VIT University',
      username: storedUser?.username || 'johndoe',
      role: storedUser?.role || 'Distributor',
      distributorReceiverId: storedUser?.distributorReceiverId || storedUser?.receiverId || 'DIST001'
    });
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
    loadProfileData(storedUser);
  }, [navigate, loadProfileData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      // Mock API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    loadProfileData(user); // Reset to original data
    setMessage('');
  };

  return (
    <DashboardLayout>
      <div className="row">
        <div className="col-12 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-1">Profile</h2>
              <p className="text-muted">Manage your account information</p>
            </div>
            {!isEditing ? (
              <button 
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                <FaEdit className="me-2" />
                Edit Profile
              </button>
            ) : (
              <div>
                <button 
                  className="btn btn-success me-2"
                  onClick={handleSave}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave className="me-2" />
                      Save
                    </>
                  )}
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  <FaTimes className="me-2" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {message && (
        <div className="row mb-4">
          <div className="col-12">
            <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
              {message}
            </div>
          </div>
        </div>
      )}

      <div className="row">
        {/* Profile Information */}
        <div className="col-md-8 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">
                <FaUser className="me-2" />
                Personal Information
              </h5>
            </div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      <FaUser className="me-1" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      className="form-control"
                      value={profileData.fullName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      <FaIdCard className="me-1" />
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      value={profileData.username}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      <FaEnvelope className="me-1" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      <FaPhone className="me-1" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      className="form-control"
                      value={profileData.phoneNumber}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      <FaBuilding className="me-1" />
                      College Name
                    </label>
                    <input
                      type="text"
                      name="collegeName"
                      className="form-control"
                      value={profileData.collegeName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      <FaIdCard className="me-1" />
                      {profileData.role === 'Distributor' ? 'Distributor ID' : 'Receiver ID'}
                    </label>
                    <input
                      type="text"
                      name="distributorReceiverId"
                      className="form-control"
                      value={profileData.distributorReceiverId}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    <FaUser className="me-1" />
                    Role
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={profileData.role}
                    disabled
                  />
                  <small className="form-text text-muted">
                    Role cannot be changed. Contact administrator if needed.
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Account Summary */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm border-info">
            <div className="card-header bg-info text-white">
              <h6 className="card-title mb-0">Account Summary</h6>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span>Account Status</span>
                <span className="badge bg-success">Active</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span>Role</span>
                <span className="badge bg-primary">{profileData.role}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span>Member Since</span>
                <small className="text-muted">Jan 2024</small>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span>Last Login</span>
                <small className="text-muted">Today</small>
              </div>
            </div>
          </div>

          {profileData.role === 'Distributor' && (
            <div className="card mt-3 border-success">
              <div className="card-header bg-success text-white">
                <h6 className="card-title mb-0">Upload Statistics</h6>
              </div>
              <div className="card-body">
                <div className="text-center">
                  <h4 className="text-success mb-1">24</h4>
                  <small className="text-muted">Total Uploads</small>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <small>This Month: <strong>8</strong></small>
                  <small>Last Month: <strong>16</strong></small>
                </div>
              </div>
            </div>
          )}

          {profileData.role === 'Receiver' && (
            <div className="card mt-3 border-warning">
              <div className="card-header bg-warning text-white">
                <h6 className="card-title mb-0">Download Statistics</h6>
              </div>
              <div className="card-body">
                <div className="text-center">
                  <h4 className="text-warning mb-1">16</h4>
                  <small className="text-muted">Total Downloads</small>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <small>This Month: <strong>6</strong></small>
                  <small>Last Month: <strong>10</strong></small>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;