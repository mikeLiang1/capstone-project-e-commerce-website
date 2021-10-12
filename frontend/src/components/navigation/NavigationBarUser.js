import React from 'react';

import { Link } from 'react-router-dom';

import './NavigationBar.css';

function NavigationBarUser() {
  return (
    <div className='NavigationBar'>
      <ul className='NavigationBar-links-left'>
        <Link to='/search' className='NavigationBar-link'>
          <li>SEARCH</li>
        </Link>
        <Link to='/explore' className='NavigationBar-link'>
          <li>EXPLORE</li>
        </Link>
        <Link to='/mysterybox' className='NavigationBar-link'>
          <li>MYSTERY BOX</li>
        </Link>
      </ul>
      <Link to='/' className='NavigationBar-link'>
        <p className='NavigationBar-brand-name'>NOCTA TECH</p>
      </Link>
      <ul className='NavigationBar-links-right'>
        <Link to='/account' className='NavigationBar-link'>
          <li>ACCOUNT</li>
        </Link>
        <Link to='/login' className='NavigationBar-link'>
          <li>LOGOUT</li>
        </Link>
        <Link to='/cart' className='NavigationBar-link'>
          <li>CART</li>
        </Link>
      </ul>
    </div>
  );
}

export default NavigationBarUser;
