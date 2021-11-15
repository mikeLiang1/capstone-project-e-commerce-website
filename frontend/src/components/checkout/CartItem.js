import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Select,
  FormControl,
  Card,
  IconButton,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import './CartItem.css';

function CartItem({ item, handleRemove, handleQuantity }) {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(item.itemQuantity);
  const changeQuantity = (e) => {
    console.log('ChangeQuantity');
    setQuantity(e.target.value);
  };

  useEffect(() => {
    console.log('Quantity Change', quantity);
    handleQuantity(productId, quantity);
  }, [quantity]);

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
          <Link to={`/product/${item.id}`}>
            <img
              className='LargeItemContainer-image'
              src={item.imageUrl}
              alt='Item Image'
              style={{ width: '175px' }}
            ></img>
          </Link>
        </div>
        <div className='CartItem-information'>
          <p style={{ fontSize: '16px', fontWeight: '700' }}>Item</p>
          <p>{item.itemName}</p>
        </div>
        <div className='CartItem-quantity'>
          {/* If the item is a mystery box or a mystery box prize, do not let the user
                change the quantity */}
          {item.itemCategory === 'Mystery Box' || item.itemPrice === 0 ? (
            <div>1</div>
          ) : (
            <FormControl fullWidth>
              <InputLabel
                id='demo-controlled-open-select-label'
                variant='standard'
              >
                Quantity
              </InputLabel>
              <Select
                labelId='demo-controlled-open-select-label'
                onChange={changeQuantity}
                value={quantity}
                defaultValue={item.itemQuantity}
                onClick={() => {
                  setProductId(item.id);
                }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
            </FormControl>
          )}
        </div>
        <div className='CartItem-price'>
          ${item.itemPrice}
          <div className='CartItem-remove'>
            {item.itemPrice !== 0 ? (
              <IconButton
                onClick={() => {
                  handleRemove(item.id);
                }}
                size='small'
              >
                <DeleteIcon />
              </IconButton>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CartItem;
