import React from 'react';
import { Link } from 'react-router-dom';

import TextButton from '../buttons-and-sections/TextButton.js';

import "./LoginPage.css"

function LoginPage() {
  return (
    <div className='LoginPage'>
      <form className='LoginPage-login-section' method='POST'>
        <h2>LOGIN</h2>
        <div className='LoginPage-form-group'>
          <label className='LoginPage-form-label' for='email'>
            Email Address
          </label>
          <input
            className='LoginPage-form-control'
            type='email'
            id='email'
            name='email'
            placeholder='Enter Email'
          />
        </div>
        <div className='LoginPage-form-group'>
          <label className='LoginPage-form-label' for='password'>
            Password
          </label>
          <input
            className='LoginPage-form-control'
            type='password'
            id='password'
            name='password'
            placeholder='Enter Password'
          />
        </div>
        <br />
        <TextButton buttonName='Sign In' buttonType='submit' />
      </form>
      <div className='LoginPage-register-section'>
        <h2>REGISTER</h2>
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
