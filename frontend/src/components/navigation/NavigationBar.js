import React from 'react';

import { Link } from 'react-router-dom';

import './NavigationBar.css';

function NavigationBar({ user, admin }) {
  // Default values of the following variables are for a "Guest"
  // Refers to the name of the Links on the "Right Side" of the Navigation Bar
  var link_name_left = 'LOGIN';
  var link_name_middle = 'REGISTER';
  var link_name_right = 'CART';
  // Refers to the Route/Path of the Links on the "Right Side" of the Navigation Bar
  var link_route_left = '/login';
  var link_route_middle = '/register';
  var link_route_right = 'cart';

  if (user === 'true') {
    link_name_left = 'ACCOUNT';
    link_name_middle = 'LOGOUT';
    link_route_left = '/account';
    link_route_middle = '/';
  } else if (admin === 'true') {
    link_name_left = 'SALES';
    link_name_middle = 'ADD PRODUCT';
    link_name_right = 'LOGIN/LOGOUT';
    link_route_left = '/sales';
    link_route_middle = '/addproduct';
    link_route_right = '/login';
  }

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
        <Link to={link_route_left} className='NavigationBar-link'>
          <li>{link_name_left}</li>
        </Link>
        <Link to={link_route_middle} className='NavigationBar-link'>
          <li>{link_name_middle}</li>
        </Link>
        <Link to={link_route_right} className='NavigationBar-link'>
          <li>{link_name_right}</li>
        </Link>
      </ul>
    </div>
  );
}

export default NavigationBar;
