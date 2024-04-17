import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
export function EmailLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://password-reset-bgme.onrender.com/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setError('');
        localStorage.setItem('token', data.token);
        navigate('/login/myaccount');
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className='form'>
      <h1>Login</h1>
      <form className="textbars"onSubmit={handleLogin}>
      <TextField
          id="outlined-basic-email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
         <TextField
         className='textfield'
          id="outlined-basic-password"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         <Button variant="contained" onClick={handleLogin}>Login</Button>
      </form>
      <div className="error-container">
    {error && <Typography color="error">{error}</Typography>}
  </div>
  <span>A New User? Sign Up <Link className='Link' to="/">Click Here</Link></span>
  <Link className='Link' to="/forgotPassword">Forgot Password</Link>
    </div>
  );
}
