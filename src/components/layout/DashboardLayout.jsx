import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { validateToken } from '../../utils/tokenValidation';
import '../styles/dashboard-layout.css';

const DashboardLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const validatedUser = validateToken(token);
    
    if (!validatedUser) {
      navigate('/login');
      return;
    }
    
    setUser(validatedUser);
  }, [navigate]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  if (!user) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      
      {/* Main Content Area */}
      <div 
        className={`main-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}
        style={{ 
          marginLeft: isMobile ? '0' : (isSidebarCollapsed ? '80px' : '250px'),
          transition: 'margin-left 0.3s ease'
        }}
      >
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} isCollapsed={isSidebarCollapsed} />
        
        {/* Page Content */}
        <main className="page-content">
          <div className="content-wrapper">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;