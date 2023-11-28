import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

export function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams(); 

 

  const handleReset = () => {
    if (password === confirmPassword) {
      const resetEndpoint = `https://reset-password-backend-l071.onrender.com/users/reset-password/${token}`;
      const newPassword = password;

      fetch(resetEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Password reset failed');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Password reset successful:', data);
        // Show success message or redirect user if needed
      })
      .catch((error) => {
        console.error('Password reset failed:', error.message);
        // Show error message to the user or handle the error
      });
    } else {
      console.error('Passwords do not match');
      // Show an error message indicating password mismatch
    }
  };


  return (
    <div>
      <h2>Reset Your Password</h2>
      <TextField
        label="New Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label="Confirm New Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleReset}>
        Reset Password
      </Button>
    </div>
  );
}

export default ResetPassword;
