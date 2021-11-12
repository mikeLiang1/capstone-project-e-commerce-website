import React, { useEffect, useState } from 'react';

import './AccountDetailsPage.css';
import TextButton from '../buttons-and-sections/TextButton';
import Cookies from 'js-cookie';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import BasicTextField from '../buttons-and-sections/BasicTextField';
import { Alert } from '@mui/material';

import { initializeApp } from '@firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
} from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAVOqrvODx6KS-xBGs5guJTrKBJjduEjRI',
  authDomain: 'nocta-tech.firebaseapp.com',
  projectId: 'nocta-tech',
  storageBucket: 'nocta-tech.appspot.com',
  messagingSenderId: '1002605988200',
  appId: '1:1002605988200:web:e91efebc3765fd58b0eedd',
  measurementId: 'G-5HBFEX2BNM',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function AccountDetailsPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [address, setAddress] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const changeEmail = async () => {
    signInWithEmailAndPassword(auth, currentEmail, currentPassword)
      .then((userCredential) => {
        // Signed In
        const user = userCredential.user;
        // Change Email
        updateEmail(user, newEmail)
          .then(async () => {
            // Successful
            alert('Email updated successfully!');
            // Update User's Email on Frontend
            setCurrentEmail(newEmail);
            // Update User's Email in the Database
            updateUserDatabaseProfile();
            // Log the user in through their new email (so their current session is preserved)
            const loginDetails = { email: newEmail, password: currentPassword };
            console.log('Login Details: ', loginDetails);
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
              setOpen(true);
            } else if (response.status === 200) {
              const data = await response.json();
              Cookies.set('user', data.idToken);
              window.location.reload(false);
            }
          })
          .catch((error) => {
            alert('Error: ', error);
          });
      })
      .catch((error) => {
        alert('Incorrect Password. Try again');
      });
  };

  const changePassword = async () => {
    signInWithEmailAndPassword(auth, currentEmail, currentPassword)
      .then((userCredential) => {
        // Signed In
        const user = userCredential.user;
        // Change Password
        updatePassword(user, newPassword)
          .then(async () => {
            // Successful
            alert('Password updated successfully!');
            // Update the User's Password on the Frontend TEMPORARILY (for login purposes only)
            setCurrentPassword(newPassword);
            // Log the user in through their new password (so their current session is preserved)
            const loginDetails = { email: currentEmail, password: newPassword };
            console.log('Login Details: ', loginDetails);
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
              setOpen(true);
            } else if (response.status === 200) {
              const data = await response.json();
              Cookies.set('user', data.idToken);
              window.location.reload(false);
            }
          })
          .catch((error) => {
            alert('Error: ', error);
          });
      })
      .catch((error) => {
        alert('Incorrect Password. Try again');
      });
    // Clear the CurrentPassword and NewPassword for security
    setCurrentPassword('');
    setNewPassword('');
  };

  const updateUserDatabaseProfile = async () => {
    const emailDetails = {
      uid: Cookies.get('user'),
      currentEmail: currentEmail,
      newEmail: newEmail,
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(emailDetails),
    };
    const response = await fetch('/auth/user/emailupdate', requestOptions);
    if (response.status !== 200) {
      setError('Failed to Update Email');
      setOpen(true);
    } else if (response.status === 200) {
      const data = await response.json();
      alert('Email updated successfully!');
    }
  };

  const getCustomerDetails = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const response = await fetch(
      `/auth/user/${Cookies.get('user')}`,
      requestOptions
    );
    if (response.status !== 200) {
      setError('Failed to get Customer Details!');
      setOpen(true);
    } else if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      setFirstName(data.content.first);
      setLastName(data.content.last);
      setCurrentEmail(data.id);
      setAddress(data.content.address);
    }
  };

  const changeDetails = async () => {
    const updatedDetails = {
      uid: Cookies.get('user'),
      fname: firstName,
      lname: lastName,
      address: address,
    };

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(updatedDetails),
    };

    const response = await fetch('/auth/user', requestOptions);
    if (response.status === 500) {
      console.log('Not Successful');
    } else if (response.status === 400) {
      alert('Backend Error');
    } else if (response.status === 200) {
      const data = await response.json();
    }
  };

  useEffect(() => {
    getCustomerDetails();
  }, []);

  return (
    <div className='AccountDetailsPage'>
      <h2 style={{ fontSize: '24px', paddingBottom: '32px' }}>
        ACCOUNT DETAILS
      </h2>
      <div className='AccountDetailsPage-account-details'>
        <div>
          <div>First Name: </div>
          {editFirstName ? (
            <form className='AccountDetailsPage-change-details-form'>
              <BasicTextField
                value={firstName}
                handleChange={(e) => setFirstName(e.target.value)}
              />
              <br />
            </form>
          ) : (
            <div style={{ padding: '36px 0', fontWeight: '700' }}>
              {firstName}
            </div>
          )}
        </div>
        <div>
          {editFirstName ? (
            <div className='AccountDetailsPage-change-details-options'>
              <TextButton
                buttonName='Save'
                buttonType='submit'
                handleClick={() => {
                  changeDetails();
                  setEditFirstName(false);
                }}
              />
              <br></br>
              <TextButton
                buttonName='Cancel'
                handleClick={() => {
                  setEditFirstName(false);
                }}
              />
            </div>
          ) : (
            <TextButton
              buttonName='Edit'
              buttonType='button'
              handleClick={() => {
                setEditFirstName(true);
              }}
            />
          )}
        </div>
      </div>
      <div className='AccountDetailsPage-account-details'>
        <div>
          <div>Last Name: </div>
          {editLastName ? (
            <form className='AccountDetailsPage-change-details-form'>
              <BasicTextField
                value={lastName}
                handleChange={(e) => setLastName(e.target.value)}
              />
              <br />
            </form>
          ) : (
            <div style={{ padding: '36px 0', fontWeight: '700' }}>
              {lastName}
            </div>
          )}
        </div>
        <div>
          {editLastName ? (
            <div className='AccountDetailsPage-change-details-options'>
              <TextButton
                buttonName='Save'
                buttonType='submit'
                handleClick={() => {
                  changeDetails();
                  setEditLastName(false);
                }}
              />
              <br></br>
              <TextButton
                buttonName='Cancel'
                handleClick={() => {
                  setEditLastName(false);
                }}
              />
            </div>
          ) : (
            <TextButton
              buttonName='Edit'
              buttonType='button'
              handleClick={() => {
                setEditLastName(true);
              }}
            />
          )}
        </div>
      </div>
      <div className='AccountDetailsPage-account-details'>
        <div>
          <div>Address: </div>
          <div style={{ fontStyle: 'italic' }}>
            (Street, Suburb, State, Postcode, Country)
          </div>
          {editAddress ? (
            <form className='AccountDetailsPage-change-details-form'>
              <BasicTextField
                value={address}
                handleChange={(e) => setAddress(e.target.value)}
              />
              <br />
            </form>
          ) : (
            <div style={{ padding: '36px 0', fontWeight: '700' }}>
              {address === null ? (
                'No address is saved on your account'
              ) : (
                <div>{address}</div>
              )}
            </div>
          )}
        </div>
        <div>
          {editAddress ? (
            <div className='AccountDetailsPage-change-details-options'>
              <TextButton
                buttonName='Save'
                buttonType='submit'
                handleClick={() => {
                  changeDetails();
                  setEditAddress(false);
                }}
              />
              <br></br>
              <TextButton
                buttonName='Cancel'
                handleClick={() => {
                  setEditAddress(false);
                }}
              />
            </div>
          ) : (
            <TextButton
              buttonName='Edit'
              buttonType='button'
              handleClick={() => {
                setEditAddress(true);
              }}
            />
          )}
        </div>
      </div>
      <div className='AccountDetailsPage-account-details'>
        <div>
          <div>Email: </div>
          {editEmail ? (
            <form className='AccountDetailsPage-change-details-form'>
              <BasicTextField
                value={currentEmail}
                textName='Current Password'
                id='outlined-password-input'
                type='password'
                handleChange={(e) => setCurrentPassword(e.target.value)}
              />
              <BasicTextField
                value={newEmail}
                textName='New Email'
                handleChange={(e) => setNewEmail(e.target.value)}
              />
              <br />
            </form>
          ) : (
            <div style={{ padding: '36px 0', fontWeight: '700' }}>
              {currentEmail}
            </div>
          )}
        </div>
        <div>
          {editEmail ? (
            <div className='AccountDetailsPage-change-details-options'>
              <TextButton
                buttonName='Save'
                buttonType='submit'
                handleClick={() => {
                  changeEmail();
                  setEditEmail(false);
                }}
              />
              <br></br>
              <TextButton
                buttonName='Cancel'
                handleClick={() => {
                  setEditEmail(false);
                }}
              />
            </div>
          ) : (
            <TextButton
              buttonName='Edit'
              buttonType='button'
              handleClick={() => {
                setEditEmail(true);
              }}
            />
          )}
        </div>
      </div>
      <div className='AccountDetailsPage-account-details'>
        <div>
          <div>Password: </div>
          {editPassword ? (
            <form className='AccountDetailsPage-change-details-form'>
              <BasicTextField
                value={currentPassword}
                textName='Current Password'
                id='outlined-password-input'
                type='password'
                handleChange={(e) => setCurrentPassword(e.target.value)}
              />
              <BasicTextField
                value={newPassword}
                textName='New Password'
                id='outlined-password-input'
                type='password'
                handleChange={(e) => setNewPassword(e.target.value)}
              />
              <br />
            </form>
          ) : (
            <div style={{ padding: '36px 0', fontWeight: '700' }}>
              *********
            </div>
          )}
        </div>
        <div>
          {editPassword ? (
            <div className='AccountDetailsPage-change-details-options'>
              <TextButton
                buttonName='Save'
                buttonType='submit'
                handleClick={() => {
                  changePassword();
                  setEditPassword(false);
                }}
              />
              <br></br>
              <TextButton
                buttonName='Cancel'
                handleClick={() => {
                  setEditPassword(false);
                }}
              />
            </div>
          ) : (
            <TextButton
              buttonName='Edit'
              buttonType='button'
              handleClick={() => {
                setEditPassword(true);
              }}
            />
          )}
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

export default AccountDetailsPage;
