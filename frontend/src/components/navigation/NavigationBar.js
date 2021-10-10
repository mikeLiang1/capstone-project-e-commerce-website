import React from 'react';

import { Link } from 'react-router-dom';

import './NavigationBar.css';

function NavigationBar({ user }) {
  return (
    <div>
      {user === 'true' ? (
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
            <Link to='/login' className='NavigationBar-link'>
              <li>SALES</li>
            </Link>
            <Link to='/register' className='NavigationBar-link'>
              <li>ADD PRODUCT</li>
            </Link>
            <Link to='/cart' className='NavigationBar-link'>
              <li>LOGIN/LOGOUT</li>
            </Link>
          </ul>
        </div>
      ) : (
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
            <Link to='/login' className='NavigationBar-link'>
              <li>LOGIN</li>
            </Link>
            <Link to='/register' className='NavigationBar-link'>
              <li>REGISTER</li>
            </Link>
            <Link to='/cart' className='NavigationBar-link'>
              <li>CART</li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavigationBar;
