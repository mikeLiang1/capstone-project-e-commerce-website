import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { Paper } from '@material-ui/core';

import './SmallItemContainer.css';

function SmallItemContainer({ itemName, imageUrl, productRouteId }) {
  return (
    <div className='SmallItemContainer'>
      <Paper
        elevation={3}
        style={{
          display: 'flex',
          height: '150px',
          width: '150px',
          backgroundColor: '#E8E8E8',
        }}
      >
        <div className='SmallItemContainer-image-container'>
          <Link to={`/product/${productRouteId}`}>
            <img
              className='SmallItemContainer-image'
              src={imageUrl}
              alt='Item Image'
            ></img>
          </Link>
        </div>
      </Paper>
      <p style={{ fontSize: '13px', paddingTop: '8px' }}>{itemName}</p>
    </div>
  );
}

export default SmallItemContainer;

SmallItemContainer.propTypes = {
  itemName: PropTypes.string,
};
