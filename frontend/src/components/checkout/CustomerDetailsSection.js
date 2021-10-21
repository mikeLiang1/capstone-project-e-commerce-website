import React from 'react';

import './CustomerDetailsSection.css';

function CustomerDetailsSection({ firstName, lastName, email, address }) {
  return (
    <div className='CustomerDetailsSection'>
      <div className='CustomerDetailsSection-name'>
        {firstName} {lastName}
      </div>
      <div className='CustomerDetailsSection-email'>{email}</div>
      <div className='CustomerDetailsSection-address'>
        <p style={{ fontSize: '16px', fontWeight: '700' }}>Delivery Address</p>
        {address != null ? (
          <div>{address}</div>
        ) : (
          <div>
            No saved address exists in your account details. Please enter your
            delivery address.
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerDetailsSection;
