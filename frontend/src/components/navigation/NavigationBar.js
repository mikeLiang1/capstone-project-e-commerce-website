import React from 'react';

import { Link } from 'react-router-dom';

import './NavigationBar.css';

function NavigationBar() {
  return (
    <div className='nav-menu'>
      <ul className='nav-links-left'>
        <Link to='/search' className='nav-link'>
          <li>SEARCH</li>
        </Link>
        <Link to='/explore' className='nav-link'>
          <li>EXPLORE</li>
        </Link>
        <Link to='/mysterybox' className='nav-link'>
          <li>MYSTERY BOX</li>
        </Link>
      </ul>
      <Link to='/' className='nav-link'>
        <p className='brand-name'>NOCTA TECH</p>
      </Link>
      <ul className='nav-links-right'>
        <Link to='/login' className='nav-link'>
          <li>LOGIN</li>
        </Link>
        <Link to='/register' className='nav-link'>
          <li>REGISTER</li>
        </Link>
        <Link to='/cart' className='nav-link'>
          <li>CART</li>
        </Link>
      </ul>
    </div>
  );
}

export default NavigationBar;
