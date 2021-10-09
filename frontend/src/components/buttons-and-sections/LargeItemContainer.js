import React from 'react';

import { Paper } from '@material-ui/core';

import './LargeItemContainer.css';

function LargeItemContainer({ itemName, imageUrl }) {
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
          <img
            className='LargeItemContainer-image'
            src={imageUrl}
            alt='Item Image'
          ></img>
        </div>
      </Paper>
      <p>{itemName}</p>
    </div>
  );
}

export default LargeItemContainer;
