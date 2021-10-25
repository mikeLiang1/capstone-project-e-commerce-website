import React, { useState, useEffect } from 'react';
import TextButton from '../buttons-and-sections/TextButton.js';
import { Link } from 'react-router-dom';

import './CartPage.css';
import CartItem from '../buttons-and-sections/CartItem.js';
import Accordian from '../buttons-and-sections/Accordian.js';
import CustomerDetailsSection from './CustomerDetailsSection.js';
import Cookies from 'js-cookie';
import CheckoutPage from './CheckoutPage.js';

function CartPage({ token }) {
  // TODO: useEffect to retrieve information from the backend about the current user's
  // cart, including: Items, Quantity of Items, Personal Information/Details
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  // const [cartAccordian, setCartAccordian] = useState(
  //   <Accordian title='Items' content={cartItems} />
  // );

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
      console.log('Fetch cart: ', cartData);
      let items = [];
      for (var i = 0; i < cartData.cart.length; i++) {
        items.push({
          id: cartData.cart[i].product,
          content: (
            <CartItem
              itemName={cartData.cart[i].name}
              imageUrl={cartData.cart[i].image}
              itemQuantity={cartData.cart[i].quantity}
              itemPrice={cartData.cart[i].price}
              productRouteId={cartData.cart[i].product}
              handleRemove={handleRemove}
            />
          ),
        });
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
    console.log('CartItems: ', cartItems);
    let total = 0;
    cartItems.map((item) => {
      total =
        total + item.content.props.itemPrice * item.content.props.itemQuantity;
    });
    setTotalPrice(total);
  }, [cartItems]);

  const handleRemove = async (productToRemoveId) => {
    // Given a productId, remove it from the cartItems list (displayed to the user)
    console.log('Hello!', cartItems);
    // Backend Remove Item from Cart
    const cartRemoveBody = {
      uid: Cookies.get('user'),
      productId: productToRemoveId,
    };
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(cartRemoveBody),
    };

    const response = await fetch('/cart', requestOptions);
    if (response.status != 200) {
      alert('Failed to reove from Cart!');
    } else if (response.status === 200) {
      const data = await response.json();
    }
    // Frontend Remove Item from Cart
    getCartDetails();
    // setCartItems(cartItems.filter((item) => item.id !== productToRemoveId));
  };

  // useEffect(() => {
  //   setCartAccordian(<Accordian title='Items' content={cartItems} />);
  // }, [cartItems]);

  return (
    <div className='CartPage'>
      <h2 style={{ fontSize: '24px' }}>SHOPPING CART</h2>
      <div className='CartPage-cart-items'>
        <div className='CartPage-cart-items-title'>
          <p>Cart Items</p>
        </div>
        {cartItems.length === 0 ? (
          <p style={{ paddingBottom: '16px' }}>
            Your cart is <span style={{ color: '#FF7A00' }}>empty</span>
          </p>
        ) : (
          cartItems.map((item) => <div>{item.content}</div>)
        )}
        <div className='CartPage-cart-items-total-price'>
          <p style={{ color: '#FF7A00' }}>
            Subtotal: &emsp; &emsp; &emsp; &emsp; &emsp;
          </p>
          <p>${totalPrice}</p>
        </div>
      </div>
      {/* {cartItems} */}
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
      <Accordian title='Payment' content={<CheckoutPage />} />
    </div>
  );
}

export default CartPage;
