import React, { useState, useEffect } from 'react';
import TextButton from '../buttons-and-sections/TextButton.js';
import { Link } from 'react-router-dom';

import './CartPage.css';
import CartItem from '../buttons-and-sections/CartItem.js';
import Accordian from '../buttons-and-sections/Accordian.js';
import CustomerDetailsSection from './CustomerDetailsSection.js';
import Cookies from 'js-cookie';

function CartPage({ token }) {
  // TODO: useEffect to retrieve information from the backend about the current user's
  // cart, including: Items, Quantity of Items, Personal Information/Details
  const [cartItems, setCartItems] = useState([]);
  const [cartAccordian, setCartAccordian] = useState(
    <Accordian title='Items' content={cartItems} />
  );

  const [customerDetails, setCustomerDetails] = useState({
    id: '',
    content: {
      first: '',
      last: '',
      address: '',
    },
  });

  const getCartDetails = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const response = await fetch(
      `/cart/${Cookies.get('user')}`,
      requestOptions
    );
    if (response.status != 200) {
      alert('Failed to get Cart!');
    } else if (response.status === 200) {
      const cartData = await response.json();
      console.log('Cart: ', cartData);
      let items = [];
      for (var i = 0; i < cartData.cart.length; i++) {
        items.push(
          <CartItem
            itemName={cartData.cart[i].name}
            imageUrl={cartData.cart[i].image}
            itemQuantity={cartData.cart[i].quantity}
            itemPrice={cartData.cart[i].price}
          />
        );
      }
      setCartItems(items);
    }
  };

  const getCustomerDetails = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const response = await fetch(`/auth/user/${token}`, requestOptions);
    if (response.status != 200) {
      alert('Failed to get Customer Details!');
    } else if (response.status === 200) {
      const data = await response.json();
      setCustomerDetails(data);
    }
  };

  useEffect(() => {
    getCartDetails();
    getCustomerDetails();
  }, []);

  useEffect(() => {
    setCartAccordian(<Accordian title='Items' content={cartItems} />);
  }, [cartItems]);

  return (
    <div className='CartPage'>
      <h2 style={{ fontSize: '24px' }}>SHOPPING CART</h2>
      {cartItems}
      {/* <Accordian title='Items' content={cartItems} /> */}
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
