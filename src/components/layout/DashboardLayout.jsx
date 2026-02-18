import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { validateToken } from '../../utils/tokenValidation';

const DashboardLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-collapse sidebar on mobile
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarCollapsed(true);
      }
    };

    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Check authentication
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
    return null; // or loading spinner
  }

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      
      {/* Main Content Area */}
      <div 
        className="flex-grow-1 d-flex flex-column"
        style={{ 
          marginLeft: isMobile ? '0' : (isSidebarCollapsed ? '80px' : '250px'),
          transition: 'margin-left 0.3s ease'
        }}
      >
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} isCollapsed={isSidebarCollapsed} />
        
        {/* Page Content */}
        <main className="flex-grow-1 p-3 p-md-4 bg-light">
          <div className="container-fluid">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;