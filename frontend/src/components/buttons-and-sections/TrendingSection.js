import React, { useState, useEffect } from 'react';

import LargeItemContainer from './LargeItemContainer';

import './TrendingSection.css';

function TrendingSection() {
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

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const response = await fetch('/product/1/10', requestOptions);

    if (response.status != 200) {
      alert('Failed to get Trending Products!');
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
    </div>
  );
}

export default TrendingSection;
