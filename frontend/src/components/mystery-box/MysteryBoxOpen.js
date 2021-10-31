import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import SmallItemContainer from '../buttons-and-sections/SmallItemContainer'
import Cookies from 'js-cookie';

import './MysteryBoxOpen.scss'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function MysteryBoxOpen({ match }) {


  const [open, setOpen] = useState('box closed')
  const [dialogOpen, setDialog] = useState(false)
  
  function handleClick() {
    setOpen('box open')
    setDialog(true)
  }

  let boxName = match.params.boxName.toUpperCase()
  boxName = boxName.replace('_', ' MYSTERY ')
  
  const [result, setResult] = useState(['Default', '', '99'])
  
  async function boxResult() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    };
    
    const response = await fetch('/mystery_box/' + match.params.boxName + '/open', requestOptions);
    const boxData = await response.json()
    
    const ID = boxData.opened[0]
    
    const productOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }

  
    const productResponse = await fetch(`/product/${ID}`, productOptions)
  
    const productData = await productResponse.json()
    
    setResult([productData.data.name, productData.data.image, productData.data.price])
    
    const addToCartBody = {
      uid: Cookies.get('user'),
      productId: ID
    };
    console.log(addToCartBody);
    const addOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(addToCartBody),
    };

    await fetch('/cart/add_free', addOptions);
  }
  
  useEffect(() => {
    boxResult()   
  }, [])

  return (
    <div className='BoxOpenPage'>
      <h2>
        {boxName}
      </h2>
      <h4>
        Click to open!
      </h4>
      <br/>
      <ul class="box-list">
        <li>
    			<button 
    			 type="button" 
    			 class={open} 
    			 onClick={() => handleClick()}
    			></button>
    			<span class="loot-shadow"></span>
  		  </li>
      </ul>
      
      <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <div className = 'dialogContent'>
          <DialogTitle>{"Congratulations!"}</DialogTitle>
            <p>You won...</p>
            <SmallItemContainer itemName={result[0]} imageUrl={result[1]}/>
            <b>RRP: ${result[2]}</b>
            <p>The prize will now be added to your cart, free of charge.</p>
          <DialogActions>
            <Button onClick={() => setDialog(false)}>Close</Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
  
  
  
export default MysteryBoxOpen;
  