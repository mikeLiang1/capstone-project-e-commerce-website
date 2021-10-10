import React, { useState } from 'react';

import TextButton from '../buttons-and-sections/TextButton';

import './MysteryBoxPage.css';
import SmallItemContainer from '../buttons-and-sections/SmallItemContainer';

function BoxGroup({boxName}) {

    // Function calls to the backend to retrieve name, price, image, and product ids
    
    // Dummy data
    let title = 'NOCTA MYSTERY BOX'
    let price = '999.99'
    
    const [items, setItems] = useState([
        { id: 1, content: <SmallItemContainer /> },
        { id: 2, content: <SmallItemContainer /> },
        { id: 3, content: <SmallItemContainer /> },
        { id: 4, content: <SmallItemContainer /> },
        { id: 5, content: <SmallItemContainer /> }
    ]);
      
    return (
      <div className='boxGroup'>
        <div className='centered'>
            <div className='outline'>
                <b className>{title}</b><br/>
                <b>${price}</b>
            </div>
            <img height="300" width="300" src= 'https://static.cdn.packhelp.com/wp-content/uploads/2019/06/06153013/plain-shipping-boxes-packhelp-kva.jpg'/>
            <TextButton buttonName='Add to cart' buttonType='submit' />
        </div>
        <div className='boxContents'>
            <p>Prize Pool:</p>
            <div style={{ display:'flex' }}>
                {items.map((item) => (
                    <div className='outline'>
                        <div key={item.id}>{item.content}</div>
                        <b>RRP: ${price}</b>
                    </div>
                ))}
            </div>
            
        </div>
      </div>
    );
  }
  
  export default BoxGroup;
  