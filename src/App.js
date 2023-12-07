
import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { SignUp } from './SignUp';
import { EmailLogin } from './EmailLogin';
import { ForgotPassword } from './ForgotPassword';
import { MyAccount } from './MyAccount';
import { ResetPassword } from './ResetPassword';



function App() {
  const [allusers, setAllusers] = useState([]);
  
  useEffect(() => {
    fetch("https://password-reset-bgme.onrender.com/users")
      .then((res) => res.json())
      .then((data) => setAllusers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="App">
      <Link to="/login"><Button>Login</Button></Link>
      <Link to="/signup"><Button>SignUp</Button></Link>
      <Routes>
        <Route path="/login" element={<EmailLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signedup" element={<SignedUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/login/myaccount" element={<MyAccount />} />
        <Route path="/reset-password/:email/:token" element={<ResetPassword />} />

      </Routes>
     
    </div>
  );
}
export default App;


function SignedUp(){
  return(
    <div>
      <h1>
        Successfully signed up
      </h1>
    </div>
  )
}

