import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';

export function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await fetch('https://password-reset-bgme.onrender.com/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.message === 'User signed up successfully') {
          console.log('User signed up successfully!', responseData.result);
          navigate("/signedup")
        }
      } else {
        const responseData = await response.json();
        if (responseData.error === 'Email already exists') {
          setError('Email already exists. Please use a different email.');
        } else {
          setError('An error occurred. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setError('An error occurred. Please try again later.');
    }
  };
  return (
    <div>
      <TextField
        id="outlined-basic-email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)} />
      <TextField
        id="outlined-basic-password"
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" onClick={handleSignUp}>
        SignUp
      </Button>
      {error && <p>{error}</p>}
    </div>
  );
}
