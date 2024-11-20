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
    <Navbar bg="light" expand="lg" fixed="top" className="shadow px-3 navbar-custom d-flex justify-content-between">
      <Navbar.Brand as={Link} to="/" className="fw-bold">
        My Shopping List
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="align-items-center">
          {isAuthenticated ? (
            <>
              <span className="navbar-text fw-bold me-3">
                {username}
              </span>
              <Nav.Link onClick={handleLogout} className="fw-bold">
                Logout
              </Nav.Link>
            </>
          ) : (
            <Nav.Link as={Link} to="/login" className="fw-bold">
              Login
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
