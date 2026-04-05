import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaDownload, FaFileAlt, FaCheckCircle, FaClock, FaArrowRight } from 'react-icons/fa';
import DashboardLayout from './layout/DashboardLayout';
import { validateToken } from '../utils/tokenValidation';
import '../styles/dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUploads: 0,
    totalDownloads: 0,
    activePapers: 24,
    successRate: 95,
    recentActivity: []
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const validatedUser = validateToken(token);
    
    if (!validatedUser) {
      localStorage.removeItem('access_token');
      navigate('/login');
      return;
    }
    
    setUser(validatedUser);
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    
    // Mock data
    setStats({
      totalUploads: user?.role === 'Distributor' ? 12 : 0,
      totalDownloads: user?.role === 'Receiver' ? 8 : 0,
      activePapers: 24,
      successRate: 95,
      recentActivity: [
        { id: 1, action: 'Uploaded Math Paper Set A', time: '2 hours ago', type: 'upload' },
        { id: 2, action: 'Downloaded Physics Paper', time: '1 day ago', type: 'download' },
        { id: 3, action: 'Uploaded English Paper Set B', time: '3 days ago', type: 'upload' }
      ]
    });
  }, [user]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const quickActions = user?.role === 'Distributor' 
    ? [
        { title: 'Upload Papers', icon: FaUpload, action: () => navigate('/distributor'), color: 'primary' },
        { title: 'View History', icon: FaFileAlt, action: () => navigate('/history'), color: 'info' }
      ]
    : [
        { title: 'Browse Papers', icon: FaDownload, action: () => navigate('/receiver'), color: 'success' }
      ];

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <div className="dashboard-welcome">
        <div>
          <h1 className="dashboard-welcome-title">
            {getGreeting()}, {user?.role === 'Distributor' ? 'Distributor' : 'Student'}
          </h1>
          <p className="dashboard-welcome-subtitle">
            {user?.role === 'Distributor' 
              ? 'Manage and distribute exam papers securely' 
              : 'Access your exam papers'}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {user?.role === 'Distributor' && (
          <div className="stat-card fade-in-card">
            <div className="stat-icon">
              <FaUpload size={24} />
            </div>
            <div>
              <div className="stat-number">{stats.totalUploads}</div>
              <div className="stat-label">Total Uploads</div>
            </div>
          </div>
        )}
        
        {user?.role === 'Receiver' && (
          <div className="stat-card success fade-in-card">
            <div className="stat-icon">
              <FaDownload size={24} />
            </div>
            <div>
              <div className="stat-number">{stats.totalDownloads}</div>
              <div className="stat-label">Papers Downloaded</div>
            </div>
          </div>
        )}

        <div className="stat-card fade-in-card" style={{ animationDelay: '80ms' }}>
          <div className="stat-icon">
            <FaFileAlt size={24} />
          </div>
          <div>
            <div className="stat-number">{stats.activePapers}</div>
            <div className="stat-label">Active Papers</div>
          </div>
        </div>

        <div className="stat-card fade-in-card" style={{ animationDelay: '160ms' }}>
          <div className="stat-icon">
            <FaCheckCircle size={24} />
          </div>
          <div>
            <div className="stat-number">{stats.successRate}%</div>
            <div className="stat-label">Success Rate</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Quick Actions */}
        <div className="dashboard-section fade-in-card" style={{ animationDelay: '240ms' }}>
          <div className="section-header">
            <h2 className="section-title">Quick Actions</h2>
          </div>
          <div className="quick-actions">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className="quick-action-btn"
                  onClick={action.action}
                >
                  <Icon size={20} className="action-icon" />
                  <span>{action.title}</span>
                  <FaArrowRight size={16} className="action-arrow" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-section fade-in-card" style={{ animationDelay: '320ms' }}>
          <div className="section-header">
            <h2 className="section-title">Recent Activity</h2>
          </div>
          <div className="activity-list">
            {stats.recentActivity.length > 0 ? (
              stats.recentActivity.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    {activity.type === 'upload' ? <FaUpload size={16} /> : <FaDownload size={16} />}
                  </div>
                  <div className="activity-content">
                    <div className="activity-action">{activity.action}</div>
                    <div className="activity-time">
                      <FaClock size={12} className="me-1" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="activity-empty">No recent activity</div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;