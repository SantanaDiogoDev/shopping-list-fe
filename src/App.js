import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import ShoppingList from './ShoppingList';
import { Navigate } from 'react-router-dom';
import Login from './Login';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('token'));

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
        <Route path="/" element={isAuthenticated ? <ShoppingList /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
