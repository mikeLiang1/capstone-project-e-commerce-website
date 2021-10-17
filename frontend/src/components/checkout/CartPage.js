import React, { useState, useEffect } from 'react';
import TextButton from '../buttons-and-sections/TextButton.js';
import { Link } from 'react-router-dom';

import './CartPage.css';
import CartItem from '../buttons-and-sections/CartItem.js';

function CartPage() {
  // TODO: useEffect to retrieve information from the backend about the current user's
  // cart, including: Items, Quantity of Items, Personal Information/Details

  const [cartItems, setCartItems] = useState([]);

  const onAdd = (product) => {
    // Checks if the product we are about to add already exists in the Cart. If it does,
    // then increase the quantity of that item in the cart
    const exist = cartItems.find((item) => item.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...exist, quantity: exist.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className='CartPage'>
      <h2 style={{ fontSize: '24px' }}>SHOPPING CART</h2>
      <CartItem
        itemName='LG 34 UltraWide QHD IPS Monitor (34WN750)'
        imageUrl={require('../../images/LG34WN750.png').default}
        itemQuantity={0}
        itemPrice='$649'
      />
      <CartItem
        itemName='Sony WH-1000XM4 Wireless Noise Cancelling Headphones (Black)'
        imageUrl={require('../../images/SonyWH-1000XM4.png').default}
        itemQuantity={0}
        itemPrice='$499'
      />

      <Link to={'/checkout'}>
        <TextButton buttonName='Checkout' buttonType='submit' />
      </Link>
    </div>
  );
}

export default CartPage;
