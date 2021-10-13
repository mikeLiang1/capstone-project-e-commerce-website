import React from 'react';
import TextButton from '../buttons-and-sections/TextButton.js';
import { Link } from 'react-router-dom';

import './CartPage.css';

function CartPage() {
  return (
    <div id='CartPage'>
      <Link to={'/checkout'} style={{ textDecoration: 'none' }}>
        <TextButton buttonName='Checkout' buttonType='submit' />
      </Link>
    </div>
  );
}

export default CartPage;
