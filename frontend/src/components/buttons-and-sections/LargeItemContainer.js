import React from 'react';

import { Paper } from '@material-ui/core';

import './LargeItemContainer.css';
import { Link } from 'react-router-dom';

function LargeItemContainer({ itemName, imageUrl, productRouteId }) {
  return (
    <div className='LargeItemContainer'>
      <Paper
        elevation={3}
        style={{
          display: 'flex',
          height: '300px',
          width: '300px',
          backgroundColor: '#E8E8E8',
        }}
      >
        <div className='LargeItemContainer-image-container'>
          <Link to={`/product/${productRouteId}`}>
            <img
              className='LargeItemContainer-image'
              src={imageUrl}
              alt='Item Image'
            ></img>
          </Link>
        </div>
      </Paper>
      <p>{itemName}</p>
    </div>
  );
}

export default LargeItemContainer;
