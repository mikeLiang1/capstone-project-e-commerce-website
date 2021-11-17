import React, { useState, useEffect } from 'react';
import './Cart.css';
import CartItem from './CartItem';

function Cart({ cartItems, handleQuantity, handleRemove }) {
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
          <CartItem
            key={item.id}
            item={item}
            handleRemove={handleRemove}
            handleQuantity={handleQuantity}
          />
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
