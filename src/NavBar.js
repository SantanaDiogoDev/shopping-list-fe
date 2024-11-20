import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import './NavBar.css';

const NavBar = () => {
  const { isAuthenticated, username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar>
      <Link className='title' to="/">My Shopping List</Link>
      {isAuthenticated ? (
        <>
          <Link className='username'> {username} </Link>
          <Link className="login-logout" onClick={handleLogout}> Logout </Link>
        </>
        ) : (
          <Nav.Link as={Link} to="/login" className="login-logout">
            Login
          </Nav.Link>
        )}
    </Navbar>
  );
};

export default NavBar;
