import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, IconButton } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import './Cart.css';

function Cart({
  cartItems,
  incrementQuantity,
  decrementQuantity,
  handleRemove,
}) {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    cartItems.map((item) => {
      total = total + item.itemPrice * item.itemQuantity;
    });
    setTotalPrice(total);
  }, [cartItems]);

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
                <IconButton
                  onClick={() => {
                    decrementQuantity(item.id);
                  }}
                  size='small'
                  style={{ margin: '0 8px' }}
                >
                  <RemoveIcon fontSize='small' />
                </IconButton>
                <div className='CartItem-quantity-display'>
                  {item.itemQuantity}
                </div>
                <IconButton
                  onClick={() => {
                    incrementQuantity(item.id);
                  }}
                  size='small'
                  style={{ margin: '0 8px' }}
                >
                  <AddIcon fontSize='small' />
                </IconButton>
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
