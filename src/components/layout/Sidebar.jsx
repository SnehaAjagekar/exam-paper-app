import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaUpload, 
  FaHistory, 
  FaUser, 
  FaSignOutAlt,
  FaDownload,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { validateToken } from '../../utils/tokenValidation';

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
        ...commonItems.slice(0, 1), // Dashboard
        { path: '/distributor', icon: FaUpload, label: 'Upload' },
        { path: '/history', icon: FaHistory, label: 'History' },
        ...commonItems.slice(1) // Profile
      ];
    } else if (user?.role === 'Receiver') {
      return [
        ...commonItems.slice(0, 1), // Dashboard
        { path: '/receiver', icon: FaDownload, label: 'Downloads' },
        ...commonItems.slice(1) // Profile
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
          className="position-fixed w-100 h-100 d-md-none"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }}
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`bg-dark text-white position-fixed h-100 d-flex flex-column transition-all ${
          isCollapsed ? 'd-none d-md-block' : ''
        }`}
        style={{ 
          width: isCollapsed ? '80px' : '250px',
          zIndex: 1041,
          transition: 'width 0.3s ease'
        }}
      >
        {/* Sidebar Header */}
        <div className="p-3 border-bottom border-secondary">
          <div className="d-flex align-items-center justify-content-between">
            {!isCollapsed ? (
              <h5 className="mb-0 text-truncate">ExamPortal</h5>
            ) : (
              <div className="text-center w-100">
                <FaTachometerAlt size={20} className="text-primary" />
              </div>
            )}
            <button 
              className="btn btn-link text-white p-0 d-md-none"
              onClick={toggleSidebar}
            >
              <FaTimes size={18} />
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-grow-1 py-3">
          <ul className="list-unstyled">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path} className="mb-1">
                  <button
                    className={`btn w-100 text-start d-flex align-items-center px-3 py-2 border-0 ${
                      isActive 
                        ? 'bg-primary text-white' 
                        : 'text-light hover-bg-secondary'
                    }`}
                    onClick={() => {
                      navigate(item.path);
                      if (window.innerWidth < 768) toggleSidebar();
                    }}
                    style={{ 
                      backgroundColor: isActive ? '#0d6efd' : 'transparent',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.target.style.backgroundColor = '#495057';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.target.style.backgroundColor = 'transparent';
                    }}
                    title={isCollapsed ? item.label : ''}
                  >
                    <Icon className="me-3" size={18} />
                    {!isCollapsed && <span>{item.label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-top border-secondary">
          <button
            className="btn w-100 text-start d-flex align-items-center px-3 py-2 border-0 text-light hover-bg-danger"
            onClick={handleLogout}
            style={{ backgroundColor: 'transparent', transition: 'background-color 0.2s ease' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#dc3545'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            title={isCollapsed ? 'Logout' : ''}
          >
            <FaSignOutAlt className="me-3" size={18} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;