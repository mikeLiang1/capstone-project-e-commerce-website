import React, { useState, useEffect } from 'react';

import LargeItemContainer from './LargeItemContainer';

import './TrendingSection.css';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function TrendingSection() {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });

  const [items, setItems] = useState([
    { id: 1, content: <LargeItemContainer /> },
    { id: 2, content: <LargeItemContainer /> },
    { id: 3, content: <LargeItemContainer /> },
    { id: 4, content: <LargeItemContainer /> },
    { id: 5, content: <LargeItemContainer /> },
    { id: 6, content: <LargeItemContainer /> },
    { id: 7, content: <LargeItemContainer /> },
    { id: 8, content: <LargeItemContainer /> },
    { id: 9, content: <LargeItemContainer /> },
    { id: 10, content: <LargeItemContainer /> },
  ]);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const getProducts = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const response = await fetch('/product_visited', requestOptions);

    if (response.status !== 200) {
      setOpen(true);
    } else if (response.status === 200) {
      const data = await response.json();
      let items = [];
      for (var i = 0; i < data.products.length; i++) {
        // console.log(data.products[i].image);
        // console.log(data.products[i].name);
        items.push({
          name: data.products[i].content.name,
          image: data.products[i].content.image,
          routeId: data.products[i].id,
        });
      }
      setProducts(items);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className='TrendingSection'>
      <div className='TrendingSection-information'>
        <h2 style={{ fontSize: '24px' }}>TRENDING</h2>
      </div>
      <div className='TrendingSection-products-section'>
        {products.map((item, id) => (
          <div key={id}>
            <LargeItemContainer
              itemName={item.name}
              imageUrl={item.image}
              productRouteId={item.routeId}
            />
          </div>
        ))}
      </div>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
            Failed to get Trending Products
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}

export default TrendingSection;
