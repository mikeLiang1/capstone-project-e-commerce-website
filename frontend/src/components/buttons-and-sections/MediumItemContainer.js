import React from 'react';

import { Paper } from '@material-ui/core';

import './MediumItemContainer.css';
import { Link } from 'react-router-dom';

function MediumItemContainer({ imageUrl, productRouteId }) {
  return (
    <div className='MediumItemContainer'>
      <Paper
        elevation={3}
        style={{
          display: 'flex',
          height: '200px',
          width: '200px',
        }}
      >
        <div className='MediumItemContainer-image-container'>
          <Link to={`/product/${productRouteId}`}>
            <img
              className='MediumItemContainer-image'
              src={imageUrl}
              alt='Item Image'
            ></img>
          </Link>
        </div>
      </Paper>
    </div>
  );
}

export default MediumItemContainer;
