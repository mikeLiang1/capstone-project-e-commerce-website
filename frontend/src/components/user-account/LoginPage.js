import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BasicTextField from '../buttons-and-sections/BasicTextField.js';

import TextButton from '../buttons-and-sections/TextButton.js';

import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginRequest = (e) => {
    // Prevents the default action of the page refreshing
    e.preventDefault();
    const loginDetails = { email, password };

    // Send request to backend
    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginDetails),
    });
  };

  return (
    <div className='LoginPage'>
      <form className='LoginPage-login-section' onSubmit={loginRequest}>
        <h3>LOGIN</h3>
        <div className='LoginPage-form-group'>
          <BasicTextField
            textName='Email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='LoginPage-form-group'>
          <BasicTextField
            textName='Password'
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <TextButton buttonName='Sign In' buttonType='submit' />
      </form>
      <div className='LoginPage-register-section'>
        <h3>REGISTER</h3>
        <p>
          Register an account with{' '}
          <span style={{ color: '#FF7A00' }}>NOCTA TECHNOLOGY</span> for a more
          personalised experience.
        </p>
        <Link to='/register' className='LoginPage-register-link'>
          <TextButton buttonName='Register' buttonType='button' />
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
