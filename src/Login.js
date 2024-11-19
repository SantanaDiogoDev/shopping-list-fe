import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from './config';
import { useAuth } from './contexts/AuthContext';
import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const [emailOrName, setEmailOrName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null)

    try {
      const isEmail = emailOrName.includes('@');
      const loginData = {
        [isEmail ? 'email' : 'name']: emailOrName,
        password: password
      };

      const response = await axios.post(`${API_BASE_URL}/auth/login`, loginData);
      const { token } = response.data;

      Cookies.set('token', token, { secure: true, sameSite: 'Strict'});
      
      login(token, emailOrName);

    } catch (error) {
      if (error.response && error.response.status === 401){
        setError('Invalid credentials.')
      } else {
        setError('Login failed. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input type="text" value={emailOrName} onChange={(e) => setEmailOrName(e.target.value)} placeholder="Email/Name" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit" disabled={loading}> {loading ? 'Logging in...' : 'Login'}</button>
      </form>
    </div>
  );
};

export default Login;
