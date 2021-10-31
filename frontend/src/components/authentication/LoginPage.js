import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import BasicTextField from '../buttons-and-sections/BasicTextField.js';
import { TextField } from '@material-ui/core';
import TextButton from '../buttons-and-sections/TextButton.js';

import './LoginPage.css';

function LoginPage({ token, handleLogin, setAdmin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  const loginRequest = async (e) => {
    // Prevents the default action of the page refreshing
    e.preventDefault();
    const loginDetails = { email, password };

    // Send request to backend
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(loginDetails),
    };

    const response = await fetch('/auth/signin', requestOptions);

    if (response.status === 400) {
      alert('Incorrect details entered! Please try again.');
    } else if (response.status === 200) {
      const data = await response.json();
      if (email === 'admin@admin.com') {
        setAdmin('true');
        Cookies.set('admin', 'true');
      }
      token = data.idToken;
      handleLogin(token);
      console.log('Successful');
      console.log(data);
      // If login is successful, direct the user to the home page
      history.push('/');
    }
  };

  return (
    <div className='LoginPage'>
      <form className='LoginPage-login-section' onSubmit={loginRequest}>
        <h3 style={{ fontSize: '24px' }}>LOGIN</h3>
        <div className='LoginPage-form-group'>
          <BasicTextField
            textName='Email'
            type='email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            type='email'
          />
        </div>
        <div className='LoginPage-form-group'>
          <BasicTextField
            textName='Password'
            id='outlined-password-input'
            type='password'
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <TextButton buttonName='Sign In' buttonType='submit' />
      </form>
      <div className='LoginPage-register-section'>
        <h3 style={{ fontSize: '24px' }}>REGISTER</h3>
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
