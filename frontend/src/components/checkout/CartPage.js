import React, { useState, useEffect } from 'react';
import TextButton from '../buttons-and-sections/TextButton.js';
import { Link } from 'react-router-dom';

import './CartPage.css';
import Accordian from '../buttons-and-sections/Accordian.js';
import CustomerDetailsSection from './CustomerDetailsSection.js';
import Cookies from 'js-cookie';
import CheckoutPage from './CheckoutPage.js';
import Cart from './Cart.js';

function CartPage({ token }) {
  const [cartItems, setCartItems] = useState([]);

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
          itemName: cartData.cart[i].name,
          imageUrl: cartData.cart[i].image,
          itemQuantity: cartData.cart[i].quantity,
          itemPrice: cartData.cart[i].price,
        });
      }
      setCartItems([...items]);
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
    if (response.status !== 200) {
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

  // Given a productId, remove it from the cartItems list (displayed to the user)
  const handleRemove = async (productToRemoveId) => {
    // Frontend Remove Item from Cart
    if (productToRemoveId === null) {
      return;
    }
    const itemExists = cartItems.find((item) => item.id === productToRemoveId);
    if (itemExists != null) {
      // Decrement the quantity of the item in the user's cart
      setCartItems(cartItems.filter((item) => item.id !== productToRemoveId));
    }

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
      alert('Failed to remove from Cart!');
    } else if (response.status === 200) {
      const data = await response.json();
    }
  };

  // Given a productId, add to the quantity of the item in the user's cart
  const incrementQuantity = (productId) => {
    if (productId === null) {
      return;
    }
    const itemExists = cartItems.find((item) => item.id === productId);
    if (itemExists != null) {
      // Check that the item's quantity is not more than 100 (maximum product limit)
      if (itemExists.itemQuantity > 99) {
        alert(
          'Unable to increase the quantity further! You have reached the maximum purchase quantity!'
        );
        return;
      }
      // Decrement the quantity of the item in the user's cart
      setCartItems(
        cartItems.map((item) =>
          item.id === productId
            ? { ...itemExists, itemQuantity: itemExists.itemQuantity + 1 }
            : item
        )
      );
    }
  };

  // Given a productId, subtract from the quantity of the item in the user's cart
  const decrementQuantity = (productId) => {
    if (productId === null) {
      return;
    }
    const itemExists = cartItems.find((item) => item.id === productId);
    if (itemExists != null) {
      // Check that the item's quantity is not less than 1
      if (itemExists.itemQuantity < 2) {
        alert(
          'Unable to decrease the quantity further! If you wish to remove this item from your cart, please use the remove button'
        );
        return;
      }
      // Decrement the quantity of the item in the user's cart
      setCartItems(
        cartItems.map((item) =>
          item.id === productId
            ? { ...itemExists, itemQuantity: itemExists.itemQuantity - 1 }
            : item
        )
      );
    }
  };

  return (
    <div className='CartPage'>
      <h2 style={{ fontSize: '24px' }}>SHOPPING CART</h2>
      <Cart
        cartItems={cartItems}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        handleRemove={handleRemove}
      />
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
