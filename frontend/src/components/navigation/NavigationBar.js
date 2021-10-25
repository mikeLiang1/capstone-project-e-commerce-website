import React, { useEffect, useState } from 'react';

import Search from './Search';

import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './NavigationBar.css';

function NavigationBar({ token, admin, setToken, setAdmin }) {
  const [searchOpen, setSearchOpen] = useState(false)

  const handleLogout = () => {
    console.log('yes');
    Cookies.set('user', '');
    Cookies.remove('admin');
    setAdmin('');
    setToken('');
  };

  return (
    <div>
      {admin === 'true' ? (
        <div className='NavigationBar'>
          <ul className='NavigationBar-links-left'>
            <button className='NavigationBar-button'>
              <Link to='/search' className='NavigationBar-link'>
                <li>SEARCH</li>
              </Link>
            </button>
            <button className='NavigationBar-button'>
              <Link to='/explore' className='NavigationBar-link'>
                <li>EXPLORE</li>
              </Link>
            </button>
            <button className='NavigationBar-button'>
              <Link to='/mysterybox' className='NavigationBar-link'>
                <li>MYSTERY BOX</li>
              </Link>
            </button>
          </ul>
          <Link to='/' className='NavigationBar-link'>
            <p className='NavigationBar-brand-name'>NOCTA TECH</p>
          </Link>
          <ul className='NavigationBar-links-right'>
            <button
              onClick={() => handleLogout()}
              className='NavigationBar-button'
            >
              <Link to='/login' className='NavigationBar-link'>
                <li>LOGOUT</li>
              </Link>
            </button>
            <button className='NavigationBar-button'>
              <Link to='/admindash' className='NavigationBar-link'>
                <li>DASHBOARD</li>
              </Link>
            </button>
            <button className='NavigationBar-button'>
              <Link to='/addproduct' className='NavigationBar-link'>
                <li>ADD PRODUCT</li>
              </Link>
            </button>
          </ul>
        </div>
      ) : (
        // User or Guest
        <div className='NavigationBar'>
          <ul className='NavigationBar-links-left'>
            <button className='NavigationBar-button' onClick = {() => setSearchOpen(!searchOpen)}>
                <li style = {{ padding: '0px 10px' }}>SEARCH</li>
            </button>
            <button className='NavigationBar-button'>
              <Link to='/explore' className='NavigationBar-link'>
                <li>EXPLORE</li>
              </Link>
            </button>
            <button className='NavigationBar-button'>
              <Link to='/mysterybox' className='NavigationBar-link'>
                <li>MYSTERY BOX</li>
              </Link>
            </button>
          </ul>
          <Link to='/' className='NavigationBar-link'>
            <p className='NavigationBar-brand-name'>NOCTA TECH</p>
          </Link>
          <ul className='NavigationBar-links-right'>
            {token === '' ? (
              <button className='NavigationBar-button'>
                <Link to='/login' className='NavigationBar-link'>
                  <li>LOGIN</li>
                </Link>
              </button>
            ) : (
              <button
                onClick={() => handleLogout()}
                className='NavigationBar-button'
              >
                <Link
                  to='/'
                  style={{ textDecoration: 'none' }}
                  className='NavigationBar-link'
                >
                  LOGOUT
                </Link>
              </button>
            )}
            {token === '' ? (
              <button className='NavigationBar-button'>
                <Link to='/register' className='NavigationBar-link'>
                  <li>REGISTER</li>
                </Link>
              </button>
            ) : (
              <button className='NavigationBar-button'>
                <Link to='/account' className='NavigationBar-link'>
                  <li>ACCOUNT</li>
                </Link>
              </button>
            )}
            <button className='NavigationBar-button'>
              <Link to='/cart' className='NavigationBar-link'>
                <li>CART</li>
              </Link>
            </button>
          </ul>
        </div>
      )}
      {searchOpen ? <Search/> : null}
    </div>
  );
}

export default NavigationBar;
