import React from 'react';
import { Link } from 'react-router-dom';

import TextButton from "../buttons-and-sections/TextButton.js"

import login from './LoginPage.css';

function Login() {
  return (
    <div class="login-page">
      <form class='login-page-login-section' method='POST'>
        <h2>LOGIN</h2>
        <div class='login-page-form-group'>
          <label class='login-page-form-label' for='email'>
            Email Address
          </label>
          <input
            class='login-page-form-control'
            type='email'
            id='email'
            name='email'
            placeholder='Enter Email'
          />
        </div>
        <div class='login-page-form-group'>
          <label class='login-page-form-label' for='password'>
            Password
          </label>
          <input
            class='login-page-form-control'
            type='password'
            id='password'
            name='password'
            placeholder='Enter Password'
          />
        </div>
        <br />
        <TextButton buttonName="Sign In" buttonType="submit"/>
      </form>
      <div class='login-page-register-section'>
        <h2>REGISTER</h2>
        <p>
          Register an account with{' '}
          <span style={{ color: '#FF7A00' }}>NOCTA TECHNOLOGY</span> for a more
          personalised experience.
        </p>
        <Link to="/register" class="login-page-register-link">
          <TextButton buttonName="Register" buttonType="button"/>
        </Link>
      </div>
    </div>
  );
};

export default Login;
