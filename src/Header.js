import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { isAuthenticated, username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header>
      <Link className='title' to="/">My Shopping List</Link>
      {isAuthenticated ? (
        <>
          <Link className='username'> {username} </Link>
          <Link className="login-logout" onClick={handleLogout}> Logout </Link>
        </>
        ) : (
          <Link className="login-logout"> Login </Link>
        )}
    </header>
  );
};

export default Header;
