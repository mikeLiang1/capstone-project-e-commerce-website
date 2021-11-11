import React, { useEffect, useState } from 'react';

import './AccountDetailsPage.css';
import TextButton from '../buttons-and-sections/TextButton';
import Cookies from 'js-cookie';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import BasicTextField from '../buttons-and-sections/BasicTextField';
import { Alert } from '@mui/material';

function AccountDetailsPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editAddress, setEditAddress] = useState(false);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
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
      setEmail(data.id);
      setAddress(data.content.address);
    }
  };

  const changeDetails = async () => {
    const updatedDetails = {
      uid: Cookies.get('user'),
      fname: firstName,
      lname: lastName,
      email: email,
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
            <TextButton
              buttonName='Save'
              buttonType='submit'
              handleClick={() => {
                changeDetails();
                setEditFirstName(false);
              }}
            />
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
            <TextButton
              buttonName='Save'
              buttonType='submit'
              handleClick={() => {
                changeDetails();
                setEditLastName(false);
              }}
            />
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
            <TextButton
              buttonName='Save'
              buttonType='submit'
              handleClick={() => {
                changeDetails();
                setEditAddress(false);
              }}
            />
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
