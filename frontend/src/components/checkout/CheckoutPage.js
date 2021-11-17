import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import CreditCardForm from './CreditCardForm';
import Button from '@material-ui/core/Button';
import TextButton from '../buttons-and-sections/TextButton';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import Tick from '../../images/Tick.png';

import './CheckoutPage.css';

function CheckoutPage({ cartData, customerDetails, mysteryBox }) {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });
  const [open, setOpen] = useState('box closed');
  const [openA, setOpenA] = React.useState(false);
  const [dialogOpen, setDialog] = useState(false);
  const [cardValid, setCardValid] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenA(false);
  };

  useEffect(() => {
    console.log(cardValid);
  }, [cardValid]);

  const handleClick = async () => {
    if (cardValid === false) {
      setOpenA(true);
    }
    if (cardValid === true) {
      setOpen('box open');
      setDialog(true);
      const today = new Date();

      for (var i = 0; i < cartData.length; i++) {
        const newBody = {
          uid: Cookies.get('user'),
          productId: cartData[i].id,
          productName: cartData[i].itemName,
          productImage: cartData[i].imageUrl,
          productQuantity: cartData[i].itemQuantity,
          productPrice: cartData[i].itemPrice,
          orderPlaced:
            today.getDate() +
            ' ' +
            today.toLocaleString('default', { month: 'long' }) +
            ' ' +
            today.getFullYear(),
          deliveryInfo: customerDetails.content.address,
          productCategory: cartData[i].itemCategory,
        };
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(newBody),
        };

        const response = await fetch(
          '/user/add/purchase_history',
          requestOptions
        );
        if (response.status != 200) {
          alert('Failed to add to purchase history!');
        }

        const cartRemoveBody = {
          uid: Cookies.get('user'),
        };
        const requestOptionsDelete = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(cartRemoveBody),
        };
        const response2 = await fetch('/remove_cart', requestOptionsDelete);

        const requestUnitSold = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        };
        await fetch(
          `/add_unit_sold/${cartData[i].id}/${cartData[i].itemQuantity}`,
          requestUnitSold
        );
      }
    }
  };

  return (
    <div style={{ minHeight: '650px' }}>
      <CreditCardForm setCardValid={setCardValid} />
      <Button
        onClick={() => {
          handleClick();
        }}
        class={open}
        type='button'
        style={{
          backgroundColor: '#000000',
          color: '#FFFFFF',
          borderRadius: '16px',
        }}
        variant='contained'
      >
        Purchase
      </Button>
      <Dialog
        open={dialogOpen}
        keepMounted
        aria-describedby='alert-dialog-slide-description'
      >
        <div className='checkoutContent'>
          <img height='50px' width='50px' src={Tick} />
          <p style={{ paddingTop: '20px' }}>
            Hey {customerDetails.content.first} {customerDetails.content.last},
          </p>

          <p style={{ fontWeight: 700, fontSize: '20px' }}>
            Your order is confirmed!
          </p>
          <DialogActions
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {mysteryBox ? (
              <Link
                to={'/mysterybox/opening/' + mysteryBox}
                className='checkout-link'
              >
                <TextButton buttonName='Open Mystery Box'></TextButton>
              </Link>
            ) : (
              <div className='CheckoutPage-order-confirmation'>
                <Link
                  to='/previousorders'
                  boxName='hello'
                  className='checkout-link'
                >
                  <TextButton buttonName='View Orders'></TextButton>
                </Link>
                <Link to='/' className='checkout-link'>
                  <TextButton buttonName='Continue Shopping'></TextButton>
                </Link>
              </div>
            )}
          </DialogActions>
        </div>
      </Dialog>

      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={openA} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
            Card Details Invalid!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}

export default CheckoutPage;
