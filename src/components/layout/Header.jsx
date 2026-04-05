import React, { useState, useEffect } from 'react';
import { FaBars, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { validateToken } from '../../utils/tokenValidation';
import { useNavigate } from 'react-router-dom';
import '../styles/header.css';

const Header = ({ toggleSidebar, isCollapsed }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  const getHeaderTitle = () => {
    const userRole = user?.role;
    if (userRole === 'Distributor') {
      return 'Distributor Portal';
    } else if (userRole === 'Receiver') {
      return 'Receiver Portal';
    }
    return 'SecureExam Portal';
  };

  const getUserInitials = () => {
    if (user?.username) {
      return user.username.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="header-menu-btn"
          onClick={toggleSidebar}
          title="Toggle sidebar"
        >
          <FaBars size={18} />
        </button>
        <h3 className="header-title">{getHeaderTitle()}</h3>
      </div>

      <div className="header-right">
        <div className="header-user">
          <div className="header-user-avatar">
            {user ? getUserInitials() : <FaUserCircle size={24} />}
          </div>
          <div className="header-user-info">
            <div className="header-user-label">Logged in as</div>
            <div className="header-user-name">{user?.role || 'User'}</div>
          </div>
        </div>
        <button
          className="header-logout-btn"
          onClick={handleLogout}
          title="Logout"
        >
          <FaSignOutAlt size={16} />
        </button>
      </div>
    </header>
  );
};

export default Header;