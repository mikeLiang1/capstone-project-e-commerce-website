import React, { useState, useEffect } from 'react';
import TextButton from '../buttons-and-sections/TextButton.js';
import { Link } from 'react-router-dom';

import './CartPage.css';
import Accordian from '../buttons-and-sections/Accordian.js';
import CustomerDetailsSection from './CustomerDetailsSection.js';
import Cookies from 'js-cookie';
import CheckoutPage from './CheckoutPage.js';
import Cart from './Cart.js';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './CartPage.css';

function CartPage({ token }) {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });
  const [cartItems, setCartItems] = useState([]);
  const [containsBox, setContainsBox] = useState(false);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [customerDetails, setCustomerDetails] = useState({
    id: '',
    content: {
      first: '',
      last: '',
      address: '',
    },
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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
      setError('Failed to get Cart!');
      setOpen(true);
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

        if (cartData.cart[i].name.includes('MYSTERY BOX')) {
          console.log('mysterybox FOUND');
          let boxName = cartData.cart[i].name;
          // Parse boxname here
          setContainsBox(cartData.cart[i].name);
        }
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
      setError('Failed to get Customer Details!');
      setOpen(true);
    } else if (response.status === 200) {
      const data = await response.json();
      setCustomerDetails(data);
    }
  };

  useEffect(() => {
    // updateCartItemQuantities();
    getCartDetails();
    getCustomerDetails();
  }, []);

  const handleQuantity = async (productToChangeQuantityId, newQuantity) => {
    console.log('handleQuantity run...');
    // Frontend Change Item Quantity
    if (productToChangeQuantityId === null) {
      return;
    }
    const itemExists = cartItems.find(
      (item) => item.id === productToChangeQuantityId
    );
    if (itemExists != null) {
      // Change the quantity of the item in the user's cart
      setCartItems(
        cartItems.map((item) =>
          item.id === productToChangeQuantityId
            ? { ...itemExists, itemQuantity: newQuantity }
            : item
        )
      );
    }
    // Backend Change Item Quantity
    const productDetails = {
      uid: Cookies.get('user'),
      productId: productToChangeQuantityId,
      productQuantity: newQuantity,
    };
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(productDetails),
    };

    const response = await fetch('/cart', requestOptions);
    if (response.status != 200) {
      setError('Failed to remove from Cart!');
      setOpen(true);
    } else if (response.status === 200) {
      const data = await response.json();
    }
  };

  // Given a productId, remove it from the cartItems list (displayed to the user)
  const handleRemove = async (productToRemoveId) => {
    // Frontend Remove Item from Cart
    if (productToRemoveId === null) {
      return;
    }
    const itemExists = cartItems.find((item) => item.id === productToRemoveId);
    if (itemExists != null) {
      // Remove the item in the user's cart
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
      setError('Failed to remove from Cart!');
      setOpen(true);
    } else if (response.status === 200) {
      const data = await response.json();
    }
  };

  // Given a productId, add to the quantity of the item in the user's cart
  const incrementQuantity = async (productId) => {
    if (productId === null) {
      return;
    }
    // Update Product Quantity on the Frontend
    const itemExists = cartItems.find((item) => item.id === productId);
    if (itemExists != null) {
      // Check that the item's quantity is not more than 100 (maximum product limit)
      if (itemExists.itemQuantity > 99) {
        setError(
          'Unable to increase the quantity further! You have reached the maximum purchase quantity!'
        );
        setOpen(true);
        return;
      }
      // Increment the quantity of the item in the user's cart
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
        setError(
          'Unable to decrease the quantity further! If you wish to remove this item from your cart, please use the remove button'
        );
        setOpen(true);
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

  // Updates the quantities of each product in the user's cart in the backend.
  // This function is run when the user opens up the "Payment" Section in the Cart Page,
  // as well as when the Cart Page first renders
  const updateCartItemQuantities = async () => {
    // Update Product Quantites on the Backend
    cartItems.map(async (item) => {
      const productDetails = {
        uid: Cookies.get('user'),
        productId: item.id,
        productQuantity: 1,
        productImage: item.imageUrl,
        productName: item.itemName,
        productPrice: item.itemPrice,
      };
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(productDetails),
      };
      const response = await fetch('/cart', requestOptions);
      if (response.status === 500) {
        alert('Error 500');
      } else if (response.status === 400) {
        alert('Failed to update product quantity! Error 400');
      } else if (response.status === 200) {
        const data = await response.json();
        console.log('Updated quantity: ', data);
      }
    });
  };

  return (
    <div className='CartPage'>
      <h2 style={{ fontSize: '24px' }}>SHOPPING CART</h2>
      <Cart
        cartItems={cartItems}
        // incrementQuantity={incrementQuantity}
        // decrementQuantity={decrementQuantity}
        handleRemove={handleRemove}
        handleQuantity={handleQuantity}
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
      <Accordian
        title='Payment'
        content={
          <CheckoutPage
            cartData={cartItems}
            customerDetails={customerDetails}
            mysteryBox={containsBox}
          />
        }
      />
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}

export default CartPage;
