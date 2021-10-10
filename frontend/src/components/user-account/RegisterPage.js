import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './RegisterPage.css';
import TextButton from '../buttons-and-sections/TextButton.js';

import RegisterPageImage from '../../images/RegisterPageImage.png';
import BasicTextField from '../buttons-and-sections/BasicTextField';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  async function registerRequest(e) {
    // Prevents the default action of the page refreshing
    e.preventDefault();

    // Format data in a single dictionary to be ready to send to the backend
    const registerDetails = { email, fname, lname, password };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(registerDetails),
    };

    const response = await fetch('/auth/register', requestOptions);

    if (response.status === 500) {
      console.log('Not Successful');
    } else if (response.status === 200) {
      const data = await response.json();
      console.log('Successful');
      console.log(data);
      // If account registration is successful, direct the user to the home page
      history.push('/');
    }
  }

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
