import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import BasicTextField from '../buttons-and-sections/BasicTextField.js';

import TextButton from '../buttons-and-sections/TextButton.js';

import './LoginPage.css';

function LoginPage({ token, handleLogin }) {
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

    if (response.status === 500) {
      console.log('Not Successful');
    } else if (response.status === 200) {
      const data = await response.json();
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
