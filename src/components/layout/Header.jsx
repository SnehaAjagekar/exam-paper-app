import React, { useState, useEffect } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { validateToken } from '../../utils/tokenValidation';

const Header = ({ toggleSidebar, isCollapsed }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const validatedUser = validateToken(token);
    setUser(validatedUser);
  }, []);

  return (
    <header className="bg-white shadow-sm border-bottom p-3">
      <div className="d-flex align-items-center justify-content-between">
        {/* Left side - Menu toggle and title */}
        <div className="d-flex align-items-center">
          <button 
            className="btn btn-link text-dark p-1 me-3"
            onClick={toggleSidebar}
            style={{ fontSize: '1.2rem' }}
          >
            <FaBars />
          </button>
          <h4 className="mb-0 text-dark d-none d-sm-block">
            {user?.role === 'Distributor' ? 'Distributor Dashboard' : 'Receiver Dashboard'}
          </h4>
          <h6 className="mb-0 text-dark d-block d-sm-none">
            Dashboard
          </h6>
        </div>

        {/* Right side - User info */}
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center text-muted">
            <FaUserCircle className="me-2" size={24} />
            <div className="d-none d-sm-block">
              <small className="d-block text-muted">Logged in as</small>
              <strong className="text-dark">{user?.role || 'User'}</strong>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;