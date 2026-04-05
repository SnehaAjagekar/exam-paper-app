import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaUpload, 
  FaHistory, 
  FaUser, 
  FaSignOutAlt,
  FaDownload,
  FaTimes,
  FaLock
} from 'react-icons/fa';
import { validateToken } from '../../utils/tokenValidation';
import '../styles/sidebar.css';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const validatedUser = validateToken(token);
    setUser(validatedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getMenuItems = () => {
    const commonItems = [
      { path: '/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
      { path: '/profile', icon: FaUser, label: 'Profile' }
    ];

    if (user?.role === 'Distributor') {
      return [
        ...commonItems.slice(0, 1),
        { path: '/distributor', icon: FaUpload, label: 'Upload' },
        { path: '/history', icon: FaHistory, label: 'History' },
        ...commonItems.slice(1)
      ];
    } else if (user?.role === 'Receiver') {
      return [
        ...commonItems.slice(0, 1),
        { path: '/receiver', icon: FaDownload, label: 'Downloads' },
        ...commonItems.slice(1)
      ];
    }
    
    return commonItems;
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="sidebar-overlay"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="sidebar-brand-wrapper">
            <div className="sidebar-brand-icon">
              <FaLock size={20} />
            </div>
            {!isCollapsed && (
              <h5 className="sidebar-brand">SecureExam</h5>
            )}
          </div>
          <button 
            className="sidebar-close-btn d-lg-none"
            onClick={toggleSidebar}
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li className="sidebar-item" key={item.path}>
                  <button
                    className={`sidebar-link ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      navigate(item.path);
                      if (window.innerWidth < 768) toggleSidebar();
                    }}
                    title={isCollapsed ? item.label : ''}
                  >
                    <Icon className="sidebar-icon" size={18} />
                    {!isCollapsed && (
                      <span className="sidebar-label">{item.label}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="sidebar-footer">
          <button
            className="sidebar-logout"
            onClick={handleLogout}
            title={isCollapsed ? 'Logout' : ''}
          >
            <FaSignOutAlt className="sidebar-icon" size={18} />
            {!isCollapsed && (
              <span className="sidebar-label">Logout</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;