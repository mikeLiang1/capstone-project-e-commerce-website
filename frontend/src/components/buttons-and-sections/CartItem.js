import React from 'react';

import { Link } from 'react-router-dom';

import { Card, IconButton } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import './CartItem.css';

function CartItem({
  itemName,
  itemPrice,
  imageUrl,
  itemQuantity,
  productRouteId,
  handleRemove,
}) {
  const removeRequest = async () => {
    handleRemove(productRouteId);
  };

  return (
    <div className='CartItem'>
      <Card
        className='CartItem-card'
        elevation={3}
        style={{
          maxWidth: '1600px',
          minWidth: '800px',
          minHeight: '300px',
          margin: '32px 0',
          padding: '16px 16px',
        }}
      >
        <div className='CartItem-image'>
          <Link to={`/product/${productRouteId}`}>
            <img
              className='LargeItemContainer-image'
              src={imageUrl}
              alt='Item Image'
              style={{ width: '175px' }}
            ></img>
          </Link>
        </div>
        <div className='CartItem-information'>
          <p style={{ fontSize: '16px', fontWeight: '700' }}>Item</p>
          <p>{itemName}</p>
        </div>
        <div className='CartItem-quantity'>
          {/* <IconButton size='small' style={{ margin: '0 8px' }}>
            <RemoveIcon fontSize='small' />
          </IconButton> */}
          <div className='CartItem-quantity-display'>{itemQuantity}</div>
          {/* <IconButton size='small' style={{ margin: '0 8px' }}>
            <AddIcon fontSize='small' />
          </IconButton> */}
        </div>
        <div className='CartItem-price'>
          ${itemPrice}
          <div className='CartItem-remove'>
            <IconButton onClick={removeRequest} size='small'>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CartItem;
