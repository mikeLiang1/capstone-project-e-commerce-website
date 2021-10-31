import React from 'react';
import { useState } from 'react';
import SmallItemContainer from '../buttons-and-sections/SmallItemContainer';

import './MysteryBoxAnimation.css';

function MysteryBoxAnimation() {
  var initial = [];
  for (var i = 0; i < 30; i++) {
    initial.push({
      id: i,
      content: <SmallItemContainer />,
    });
  }

  const [items, setItems] = useState(initial);

  const spin = () => {};

  return (
    <div className='MysteryBoxAnimation'>
      <div className='MysteryBoxAnimation-text'>
        <h1 style={{ fontSize: '24px', fontWeight: '700' }}>
          NOCTA MYSTERY BOX
        </h1>
        <p>Opening Mystery Box...</p>
      </div>
      <div className='MysteryBoxAnimation-opening'>
        {items.map((item) => (
          <div className='MysteryBoxAnimation-item' key={item.id}>
            {item.content}
          </div>
        ))}
      </div>
      <button onClick={spin}>Spin</button>
    </div>
  );
}

export default MysteryBoxAnimation;
