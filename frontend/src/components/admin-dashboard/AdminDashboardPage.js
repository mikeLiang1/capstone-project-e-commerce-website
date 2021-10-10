import React from 'react';
import TextButton from '../buttons-and-sections/TextButton.js';
import { Link } from 'react-router-dom';

import './AdminDashboardPage.css';

function AdminDashboardPage() {
  return (
    <div id='AdminDashboardPage-flexbox'>
      <div>Admin Dashboard</div>
      <div>
        <Link to='/addproduct' style={{ textDecoration: 'none' }}>
          <TextButton buttonName='Add Product' buttonType='button' />
        </Link>
      </div>
      <div>Total Unit Sold</div>
      <div>Total Revenue</div>
      <div>Recent Reviews</div>
    </div>
  );
}

export default AdminDashboardPage;
