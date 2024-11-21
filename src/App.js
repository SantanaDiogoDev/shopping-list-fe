import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import ShoppingList from './ShoppingList';
import Login from './Login';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
    <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={isAuthenticated ? <ShoppingList /> : <Navigate to="/login" />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
