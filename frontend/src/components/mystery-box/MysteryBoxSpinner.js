import React, { useEffect, useState } from 'react';
import './MysteryBoxSpinner.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import SmallItemContainer from '../buttons-and-sections/SmallItemContainer';
import useSound from 'use-sound';
import boopSfx from './legendary.mp3';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
function MysteryBoxSpinner({ items, prize }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [play] = useSound(boopSfx);

  useEffect(() => {
    console.log('Mystery Box Items are: ', items);
  }, [items]);

  useEffect(() => {
    setTimeout(() => {
      setDialogOpen(true);
      play();
    }, 12000);
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
          <button onClick={play}>Boop!</button>
          <DialogTitle>{'Congratulations!'}</DialogTitle>
          <p>You won...</p>
          <SmallItemContainer itemName={prize.name} imageUrl={prize.image} />
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
