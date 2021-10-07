import React from 'react';
import PropTypes from 'prop-types';

import { Paper } from '@material-ui/core';

import './SmallItemContainer.css';

function SmallItemContainer({ itemName, imageUrl }) {
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
        <div class='SmallItemContainer-image-container'>
          <img
            className='SmallItemContainer-image'
            src={imageUrl}
            alt='Item Image'
          ></img>
        </div>
      </Paper>
      <p>{itemName}</p>
    </div>
  );
}

export default SmallItemContainer;

SmallItemContainer.propTypes = {
  itemName: PropTypes.string,
};
