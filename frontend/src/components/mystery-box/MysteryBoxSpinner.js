import React, { useEffect } from 'react';
import './MysteryBoxSpinner.css';

function MysteryBoxSpinner({ items, possibleItems }) {
  useEffect(() => {
    console.log('Possible Items are......', possibleItems);
  }, [possibleItems]);

  useEffect(() => {
    console.log('Mystery Box Items are: ', items);
  }, [items]);

  return (
    <div className='MysteryBoxSpinner-opening'>
      {items.map((item) => (
        <div className='MysteryBoxSpinner-item' key={item.id}>
          {item.content}
        </div>
      ))}
    </div>
  );
}

export default MysteryBoxSpinner;
