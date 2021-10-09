import React, { useState } from 'react';

import './RegisterPage.css';
import TextButton from '../buttons-and-sections/TextButton.js';

import RegisterPageImage from '../../images/RegisterPageImage.png';
import BasicTextField from '../buttons-and-sections/BasicTextField';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const registerRequest = (e) => {
    // Prevents the default action of the page refreshing
    e.preventDefault();

    // Send request to the backend
    const registerDetails = { email, fname, lname, password };

    fetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerDetails),
    })
      .then((res) => {
        if (res.ok) {
          console.log('Okay');
        } else {
          console.log('Not Successful');
        }
        res.json();
      })
      .then((data) => console.log(data));
  };

  return (
    <div className='RegisterPage'>
      <form onSubmit={registerRequest}>
        <h3>REGISTER</h3>
        <div className='RegisterPage-form-group'>
          <BasicTextField
            textName='Email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='RegisterPage-form-group'>
          <BasicTextField
            textName='First Name'
            value={fname}
            handleChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className='RegisterPage-form-group'>
          <BasicTextField
            textName='Last Name'
            value={lname}
            handleChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className='RegisterPage-form-group'>
          <BasicTextField
            textName='Password'
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
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
