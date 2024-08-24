import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Import CSS for styling

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:4000/register', { username, password });
      setSuccess('User registered successfully');
      setError('');
    } catch (error) {
      // Extract error message if available
      const errorMessage = error.response?.data?.error || 'An unexpected error occurred';
      setError(errorMessage);
      setSuccess('');
    }
  };
  

  return (
    <div className="register-container">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {error && <p className="error-message">{String(error)}</p>} {/* Ensure error is a string */}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default Register;
