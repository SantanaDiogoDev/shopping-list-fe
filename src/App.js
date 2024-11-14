import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './NavBar';
import ShoppingList from './ShoppingList';
import Login from './Login';
import { useAuth } from './contexts/AuthContext';

function App() {

  const { isAuthenticated } = useAuth();

  return (
      <div className="App">
        <NavBar />
        <Routes>
        <Route path="/" element={isAuthenticated ? <ShoppingList /> : <Navigate to="/login" />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        </Routes>
      </div>
  );
}

export default App;
