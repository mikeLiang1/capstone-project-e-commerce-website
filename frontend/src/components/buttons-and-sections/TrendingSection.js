import React, { useState } from 'react';

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

  return (
    <div className='TrendingSection'>
      <div className='TrendingSection-information'>
        <h2 style={{ fontSize: '24px' }}>TRENDING</h2>
      </div>
      <div className='TrendingSection-products-section'>
        {items.map((item) => (
          <div key={item.id}>{item.content}</div>
        ))}
      </div>
    </div>
  );
}

export default TrendingSection;
