import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import BasicSelect from '../buttons-and-sections/BasicSelect.js';

import './ItemPage.css';

function ItemPage() {
  // pass in item id
  const productId = 'aChvKCMFhjFLyJ32153r';
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [tag, setTag] = useState('');
  const [review, setReview] = useState('');
  const list = ['1', '2', '3', '4', '5'];
  const [quantity, setQuantity] = useState('');

  async function getItemData() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await fetch(`/product/${productId}`, requestOptions);
    if (res.status === 400) {
      alert('Product not found!');
    } else if (res.status === 200) {
      const data = await res.json();
      console.log(data.data);
      setCategory(data.data.category);
      setDesc(data.data.description);
      setImg(data.data.image);
      setName(data.data.name);
      setPrice(data.data.price);
      setTag(data.data.tag);
    }
  }

  useEffect(() => {
    getItemData();
  }, []);

  return (
    <div id='ItemPage'>
      <div>
        <b>{category}</b>
      </div>
      <div id='ItemPage-flex'>
        <div className='ItemPage-box-img'>
          <img src={img} alt={img} />
        </div>
        <div className='ItemPage-flex-vert'>
          <div className='ItemPage-box-info'>
            <h2>
              <b>{name}</b>
            </h2>
          </div>
          <div className='ItemPage-box-info'>
            <h2>$ {price}</h2>
          </div>
          <div className='ItemPage-box-info'>Tag: {tag}</div>
          <div className='ItemPage-box-info'>
            <div>
              <BasicSelect
                name='Quantity'
                list={list}
                selected={quantity}
                handleChange={(e) => setQuantity(e.target.value)}
              />
              <Button
                onClick={() => {
                  console.log('add');
                }}
                type='submit'
                style={{
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  borderRadius: '16px',
                }}
                variant='contained'
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
        <div className='ItemPage-flex-vert'>
          <div>
            <b>Description</b> <br />
            {desc}
          </div>
          <div>
            <b>Reviews</b>
            <br />
            {desc}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
