import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Select,
  FormControl,
  Card,
  IconButton,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import Cookies from 'js-cookie';

import './Cart.css';

function Cart({ cartItems, handleQuantity, handleRemove }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState();
  const [productId, setProductId] = useState('');

  useEffect(() => {
    let total = 0;
    cartItems.map((item) => {
      total = total + item.itemPrice * item.itemQuantity;
    });
    setTotalPrice(total);
  }, [cartItems]);

  const changeQuantity = (e) => {
    console.log('ChangeQuantity');
    setQuantity(e.target.value);
  };

  const handleClick = (id) => {
    setProductId(id);
  };

  useEffect(() => {
    handleQuantity(productId, quantity);
  }, [quantity]);

  return (
    <div className='Cart-cart-items'>
      <div className='Cart-cart-items-title'>
        <p>Cart Items</p>
      </div>
      {cartItems.length === 0 ? (
        <p style={{ paddingBottom: '16px' }}>
          Your cart is <span style={{ color: '#FF7A00' }}>empty</span>
        </p>
      ) : (
        cartItems.map((item) => (
          <div className='CartItem'>
            <Card
              className='CartItem-card'
              elevation={3}
              style={{
                maxWidth: '1600px',
                minWidth: '800px',
                minHeight: '300px',
                margin: '32px 0',
                padding: '16px 16px',
              }}
            >
              <div className='CartItem-image'>
                <Link to={`/product/${item.id}`}>
                  <img
                    className='LargeItemContainer-image'
                    src={item.imageUrl}
                    alt='Item Image'
                    style={{ width: '175px' }}
                  ></img>
                </Link>
              </div>
              <div className='CartItem-information'>
                <p style={{ fontSize: '16px', fontWeight: '700' }}>Item</p>
                <p>{item.itemName}</p>
              </div>
              <div className='CartItem-quantity'>
                {item.itemCategory === 'Mystery Box' ? (
                  <div>1</div>
                ) : (
                  <FormControl fullWidth>
                    <InputLabel
                      id='demo-controlled-open-select-label'
                      variant='standard'
                    >
                      Quantity
                    </InputLabel>
                    <Select
                      labelId='demo-controlled-open-select-label'
                      onChange={changeQuantity}
                      defaultValue={item.itemQuantity}
                      onClick={() => {
                        handleClick(item.id);
                      }}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={7}>7</MenuItem>
                      <MenuItem value={8}>8</MenuItem>
                      <MenuItem value={9}>9</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                    </Select>
                  </FormControl>
                )}
              </div>
              <div className='CartItem-price'>
                ${item.itemPrice}
                <div className='CartItem-remove'>
                  <IconButton
                    onClick={() => {
                      handleRemove(item.id);
                    }}
                    size='small'
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            </Card>
          </div>
        ))
      )}
      <div className='Cart-cart-items-total-price'>
        <p style={{ color: '#FF7A00' }}>
          Subtotal: &emsp; &emsp; &emsp; &emsp; &emsp;
        </p>
        <p>${totalPrice}</p>
      </div>
    </div>
  );
}

export default Cart;
