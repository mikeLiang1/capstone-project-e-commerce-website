import React, { useState } from 'react';

import './RegisterPage.css';
import TextButton from '../buttons-and-sections/TextButton.js';

import RegisterPageImage from '../../images/RegisterPageImage.png';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const registerRequest = (e) => {
    // Prevents the default action of the page refreshing
    e.preventDefault();

    // Send request to the backend
    const registerDetails = { email, firstName, lastName, password };

    fetch('http://127.0.0.1:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerDetails),
    }).then();
  };

  return (
    <div className='RegisterPage'>
      <form onSubmit={registerRequest}>
        <h3>REGISTER</h3>
        <div className='RegisterPage-form-group'>
          <label className='RegisterPage-form-label' for='email'>
            Email Address
          </label>
          <input
            className='RegisterPage-form-control'
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='RegisterPage-form-group'>
          <label className='RegisterPage-form-label' for='firstName'>
            First Name
          </label>
          <input
            className='RegisterPage-form-control'
            type='text'
            placeholder='Enter First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className='RegisterPage-form-group'>
          <label className='RegisterPage-form-label' for='firstName'>
            Last Name
          </label>
          <input
            className='RegisterPage-form-control'
            type='text'
            placeholder='Enter Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className='RegisterPage-form-group'>
          <label className='RegisterPage-form-label' for='password1'>
            Password
          </label>
          <input
            className='RegisterPage-form-control'
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <TextButton buttonName='Register' buttonType='submit' />
      </form>
      <div className='RegisterPage-image-container'>
        <img className='RegisterPage-image' src={RegisterPageImage}></img>
      </div>
    </div>
  );
}

export default RegisterPage;
