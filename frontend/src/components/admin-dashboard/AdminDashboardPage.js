import React from 'react';
import TextButton from '../buttons-and-sections/TextButton.js';
import { Link } from 'react-router-dom';

import './AdminDashboardPage.css';

function AdminDashboardPage() {
  return (
    <div id='AdminDashboardPage-flexbox'>
      <div className='AdminDashboardPage-box'>
        <Link to='/addproduct' style={{ textDecoration: 'none' }}>
          <TextButton buttonName='Add Product' buttonType='button' />
        </Link>
      </div>
      <div className='AdminDashboardPage-box'>Total Units Sold</div>
      <div className='AdminDashboardPage-box'>Total Revenue</div>
      <div className='AdminDashboardPage-box'>Recent Reviews</div>
    </div>
  );
}

export default AdminDashboardPage;
