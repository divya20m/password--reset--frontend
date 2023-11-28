import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
const navigate=useNavigate()
  const handleSendEmail = async () => {
    try {
      const response = await fetch('https://reset-password-backend-l071.onrender.com/users/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        console.log(data.resetLink); 
        navigate("/reset-password/:token")
        setError('');
      } else {
        setMessage('');
        setError(data.error || 'Failed to send email.');
      }
    } catch (error) {
      setMessage('');
      setError('An error occurred. Please try again.');
    }
  };

  

  return (
    <div>
      <TextField
        id="outlined-basic-email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={handleSendEmail}>Send Reset Email</Button>
      {message && <Typography>{message}</Typography>}
      {error && <Typography color="error">{error}</Typography>}
    </div>
  );
}
