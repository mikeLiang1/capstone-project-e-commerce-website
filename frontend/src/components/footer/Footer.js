import React from 'react';

import { Link } from 'react-router-dom';

import './Footer.css';

function Footer() {
  return (
    <footer className='Footer'>
      <Link class='Footer-link' to='/'>
        <h1>NOCTA TECH</h1>
      </Link>
    </footer>
  );
}

export default Footer;
