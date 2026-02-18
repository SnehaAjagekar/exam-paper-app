import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaDownload, FaFileAlt, FaUsers, FaChartLine } from 'react-icons/fa';
import DashboardLayout from './layout/DashboardLayout';
import { validateToken } from '../utils/tokenValidation';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUploads: 0,
    totalDownloads: 0,
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
    
    // Fetch dashboard stats (mock data for now)
    setStats({
      totalUploads: user?.role === 'Distributor' ? 12 : 0,
      totalDownloads: user?.role === 'Receiver' ? 8 : 0,
      recentActivity: [
        { action: 'Uploaded Math Paper Set A', time: '2 hours ago' },
        { action: 'Downloaded Physics Paper', time: '1 day ago' },
        { action: 'Uploaded English Paper Set B', time: '3 days ago' }
      ]
    });
  }, [user]);

  const quickActions = user?.role === 'Distributor' 
    ? [
        { title: 'Upload New Paper', icon: FaUpload, action: () => navigate('/distributor'), color: 'primary' },
        { title: 'View History', icon: FaFileAlt, action: () => navigate('/history'), color: 'info' }
      ]
    : [
        { title: 'Browse Papers', icon: FaDownload, action: () => navigate('/receiver'), color: 'success' }
      ];

  return (
    <DashboardLayout>
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="mb-0">Welcome back!</h2>
          <p className="text-muted">Here's what's happening with your exam papers today.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        {user?.role === 'Distributor' && (
          <div className="col-md-6 col-lg-3 mb-3">
            <div className="card bg-primary text-white h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <FaUpload size={24} className="me-3" />
                  <div>
                    <h5 className="card-title mb-0">{stats.totalUploads}</h5>
                    <small>Total Uploads</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {user?.role === 'Receiver' && (
          <div className="col-md-6 col-lg-3 mb-3">
            <div className="card bg-success text-white h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <FaDownload size={24} className="me-3" />
                  <div>
                    <h5 className="card-title mb-0">{stats.totalDownloads}</h5>
                    <small>Papers Downloaded</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card bg-info text-white h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <FaFileAlt size={24} className="me-3" />
                <div>
                  <h5 className="card-title mb-0">24</h5>
                  <small>Active Papers</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card bg-warning text-white h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <FaChartLine size={24} className="me-3" />
                <div>
                  <h5 className="card-title mb-0">95%</h5>
                  <small>Success Rate</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Quick Actions */}
        <div className="col-lg-8 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <div key={index} className="col-md-6 mb-3">
                      <div 
                        className={`card border-${action.color} h-100 cursor-pointer`}
                        onClick={action.action}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="card-body text-center">
                          <Icon size={32} className={`text-${action.color} mb-2`} />
                          <h6 className="card-title">{action.title}</h6>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-lg-4 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title mb-0">Recent Activity</h5>
            </div>
            <div className="card-body">
              {stats.recentActivity.length > 0 ? (
                <div className="list-group list-group-flush">
                  {stats.recentActivity.map((activity, index) => (
                    <div key={index} className="list-group-item border-0 px-0">
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                          <p className="mb-1 small">{activity.action}</p>
                          <small className="text-muted">{activity.time}</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted mb-0">No recent activity</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;