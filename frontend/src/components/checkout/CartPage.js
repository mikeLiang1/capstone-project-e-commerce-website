import React, { useState, useEffect } from 'react';
import TextButton from '../buttons-and-sections/TextButton.js';
import { Link } from 'react-router-dom';

import './CartPage.css';
import CartItem from '../buttons-and-sections/CartItem.js';
import Accordian from '../buttons-and-sections/Accordian.js';
import CustomerDetailsSection from './CustomerDetailsSection.js';

function CartPage({ token }) {
  // TODO: useEffect to retrieve information from the backend about the current user's
  // cart, including: Items, Quantity of Items, Personal Information/Details

  const [cartItems, setCartItems] = useState([
    <CartItem
      itemName='Sony WH-1000XM4 Wireless Noise Cancelling Headphones (Black)'
      imageUrl={require('../../images/SonyWH-1000XM4.png').default}
      itemQuantity={0}
      itemPrice='$499'
    />,
    <CartItem
      itemName='LG 34 UltraWide QHD IPS Monitor (34WN750)'
      imageUrl={require('../../images/LG34WN750.png').default}
      itemQuantity={0}
      itemPrice='$649'
    />,
  ]);

  const [customerDetails, setCustomerDetails] = useState({
    id: '',
    content: {
      first: '',
      last: '',
      address: '',
    },
  });

  const getCustomerDetails = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const response = await fetch(`/auth/user/${token}`, requestOptions);
    if (response.status !== 200) {
      alert('Failed to get Customer Details!');
    } else if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      setCustomerDetails(data);
    }
  };

  useEffect(() => {
    getCustomerDetails();
  }, []);

  return (
    <div className='CartPage'>
      <h2 style={{ fontSize: '24px' }}>SHOPPING CART</h2>
      <Accordian title='Items' content={cartItems} />
      <Accordian
        title='Customer Details'
        content={
          <CustomerDetailsSection
            firstName={customerDetails.content.first}
            lastName={customerDetails.content.last}
            email={customerDetails.id}
            address={customerDetails.content.address}
          />
        }
      />
      <Link to={'/checkout'}>
        <TextButton buttonName='Checkout' buttonType='submit' />
      </Link>
    </div>
  );
}

export default CartPage;
