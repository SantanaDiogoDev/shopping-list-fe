import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('token'));
  const [username, setUsername] = useState(Cookies.get('username') || null);

  useEffect(() => {
    const savedUsername = Cookies.get('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const login = (token, username) => {
    Cookies.set('token', token, { secure: true, sameSite: 'Strict' });
    Cookies.set('username', username);
    setIsAuthenticated(true);
    setUsername(username);
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('username');
    setIsAuthenticated(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
