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
      <div style={{ paddingTop: '70px' }}>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <ShoppingList /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
