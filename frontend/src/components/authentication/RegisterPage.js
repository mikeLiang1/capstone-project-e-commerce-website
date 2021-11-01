import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './RegisterPage.css';
import TextButton from '../buttons-and-sections/TextButton.js';

import RegisterPageImage from '../../images/RegisterPageImage.png';
import BasicTextField from '../buttons-and-sections/BasicTextField';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function RegisterPage({ token, handleLogin }) {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });

  const [email, setEmail] = useState('');
  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [alertBarState, setAlertBarState] = useState({
    open: false,
    message: '',
  });
  let history = useHistory();
  const [error, setError] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  // Function that handles the textfields input and opens up the Alert snackbar
  const handleInput = (newState) => {
    setAlertBarState({ open: true, ...newState });
  };

  const registerRequest = async (e) => {
    // Prevents the default action of the page refreshing
    e.preventDefault();

    // Check that the email address is valid
    if (/\S+@\S+\.\S+/.test(email) === false) {
      setError('Email address is not valid! Please try again');
      setOpen(true);
      return;
    }
    // Check that the first name and last names are valid
    if (fname.length < 1) {
      setError('Please enter a valid first name.');
      setOpen(true);
      return;
    }
    if (lname.length < 1) {
      setError('Please enter a valid last name.');
      setOpen(true);
      return;
    }
    // Check that password entered is more than 6 characters long
    if (password.length < 6) {
      setError(
        'Password must be longer than 6 characters. Please enter a different password.'
      );
      setOpen(true);
      return;
    }
    // Check that the passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      setOpen(true);
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
    <div>
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
      </div>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}

export default RegisterPage;
