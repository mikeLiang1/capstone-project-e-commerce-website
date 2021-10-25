import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './RegisterPage.css';
import TextButton from '../buttons-and-sections/TextButton.js';

import RegisterPageImage from '../../images/RegisterPageImage.png';
import BasicTextField from '../buttons-and-sections/BasicTextField';
import Alert from '../buttons-and-sections/Alert';

function RegisterPage({ token, handleLogin }) {
  const [email, setEmail] = useState('');
  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertBarState, setAlertBarState] = useState({
    open: false,
    message: '',
  });
  let history = useHistory();

  // Function that handles the textfields input and opens up the Alert snackbar
  const handleInput = (newState) => {
    setAlertBarState({ open: true, ...newState });
  };

  // Function that handles the close of the Alert snackbar
  const handleClose = () => {
    setAlertBarState({ open: false, ...alertBarState });
  };

  const registerRequest = async (e) => {
    // Prevents the default action of the page refreshing
    e.preventDefault();

    // Check that the email address is valid
    if (/\S+@\S+\.\S+/.test(email) === false) {
      alert('Email address is not valid! Please try again');
      return;
    }
    // Check that the first name and last names are valid
    if (fname.length < 1) {
      alert('Please enter a valid first name.');
      return;
    }
    if (lname.length < 1) {
      alert('Please enter a valid last name.');
      return;
    }
    // Check that password entered is more than 6 characters long
    if (password.length < 6) {
      setAlertBarState({
        message:
          'Password must be longer than 6 characters. Please enter a different password',
      });
      alert(
        'Password must be longer than 6 characters. Please enter a different password.'
      );
      return;
    }
    // Check that the passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    // Format data in a single dictionary to be ready to send to the backend
    const registerDetails = { email, fname, lname, password };
    console.log(registerDetails);

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
    } else if (response.status === 400) {
      alert(
        'An account with the entered email already exists! Please log in to the existing account, or sign up with a different email'
      );
    } else if (response.status === 200) {
      const data = await response.json();
      token = data.idToken;
      handleLogin(token);
      console.log('Successful');
      console.log(data);
      // If account registration is successful, direct the user to the home page
      history.push('/');
    }
  };

  return (
    <div className='RegisterPage'>
      <form onSubmit={registerRequest}>
        <h3 style={{ fontSize: '24px' }}>REGISTER</h3>
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
            id='outlined-password-input'
            type='password'
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='RegisterPage-form-group'>
          <BasicTextField
            textName='Confirm Password'
            id='outlined-password-input'
            type='password'
            value={confirmPassword}
            handleChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <br />
        <TextButton buttonName='Register' buttonType='submit' />
      </form>
      <div className='RegisterPage-image-container'>
        <img className='RegisterPage-image' src={RegisterPageImage}></img>
      </div>
      {/* <Alert
        open={alertBarState.open}
        message={alertBarState.message}
        handleClose={handleClose}
      /> */}
    </div>
  );
}

export default RegisterPage;
