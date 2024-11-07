// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from './config';

const Login = ({ onLogin }) => {
  const [emailOrName, setEmailOrName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isEmail = emailOrName.includes('@');
      const loginData = {
        [isEmail ? 'email' : 'name']: emailOrName,
        password: password
      };

      console.log("Dados de login enviados:", loginData);

      const response = await axios.post(`${API_BASE_URL}/auth/login`, loginData);
      const { token } = response.data;

      Cookies.set('token', token);

      console.log("Token:", token);
      
      onLogin();  //call the callback funtion to redirect before the login
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" value={emailOrName} onChange={(e) => setEmailOrName(e.target.value)} placeholder="Email/Name" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
