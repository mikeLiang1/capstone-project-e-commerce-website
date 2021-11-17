import React, { useEffect, useState } from 'react';
import './MysteryBoxSpinner.css';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import SmallItemContainer from '../buttons-and-sections/SmallItemContainer';
import useSound from 'use-sound';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
function MysteryBoxSpinner({ items, prize }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const addPrizeToCart = async () => {
    const prizeInformation = {
      uid: Cookies.get('user'),
      productId: prize.productId,
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(prizeInformation),
    };

    const response = await fetch('/cart/add_free', requestOptions);
  };

  useEffect(() => {
    addPrizeToCart();
    setTimeout(() => {
      setDialogOpen(true);
    }, 13000);
  }, []);

  return (
    <div className='MysteryBoxSpinner'>
      <div className='MysteryBoxSpinner-opening'>
        {items.map((item) => (
          <div className='MysteryBoxSpinner-item' key={item.id}>
            {item.content}
          </div>
        ))}
      </div>
      <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby='alert-dialog-slide-description'
      >
        <div className='dialogContent'>
          <DialogTitle>{'Congratulations!'}</DialogTitle>
          <p>You won...</p>
          <SmallItemContainer
            itemName={prize.name}
            imageUrl={prize.image}
            productRouteId={prize.productId}
          />
          <br></br>
          <b>RRP: ${prize.price}</b>
          <p>The prize will now be added to your cart, free of charge.</p>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default MysteryBoxSpinner;
