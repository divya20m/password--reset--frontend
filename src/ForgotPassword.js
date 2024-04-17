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
      const response = await fetch('https://password-reset-bgme.onrender.com/users/forgot-password', {
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
        
        // navigate("/reset-password/:token")
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
    <div className='form'>
      
      <div className="error-container">
      {message && <Typography style={{color:"green"}}>{message}</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      </div>
      <form className="textbars" onSubmit={handleSendEmail}>
      <TextField
        id="outlined-basic-email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={handleSendEmail}>Send Reset Email</Button>
      </form>
      </div>
   
  );
}
