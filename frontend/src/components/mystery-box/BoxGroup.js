import React, { useState } from 'react';

import TextButton from '../buttons-and-sections/TextButton';

import './MysteryBoxPage.css';
import SmallItemContainer from '../buttons-and-sections/SmallItemContainer';

function BoxGroup({boxName}) {
    // Dummy data
    let title = boxName.toUpperCase()
    title = title.replace("_", " MYSTERY ")
    const [price, setPrice] = useState('999.99')
    const [img, setIMG] = useState('')
    
    // Function calls to the backend to retrieve name, price, image, and product ids
    async function boxRequest() {
        // Send request to the backend        
        const requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
          };
          
        const response = await fetch('/mystery_box/' + boxName, requestOptions);
      
        if (response.status !== 200) {
            console.log('Not Successful')
        } else {
            const data = await response.json()
            console.log('Successful')
            console.log(data.box_data)
            setPrice(data.box_data.Price)
            setIMG(data.box_data.Image)
        }
    }
    
    boxRequest()
    
    const [items, setItems] = useState([
      { id: 1, content: <SmallItemContainer /> },
      { id: 2, content: <SmallItemContainer /> },
      { id: 3, content: <SmallItemContainer /> },
      { id: 4, content: <SmallItemContainer /> },
      { id: 5, content: <SmallItemContainer /> }
    ]);
    
    
    // Need to route add to cart with product id
      
    return (
      <div className='boxGroup'>
        <div className='centered'>
            <div className='outline'>
                <b className>{title}</b><br/>
                <b>${price}</b>
            </div>
            <img height="200" width="200" src= {img}/>
            <TextButton buttonName='Add to cart' buttonType='submit' />
        </div>
        <div className='boxContents'>
            <p>Prize Pool:</p>
            <div style={{ display:'flex', overflow:'auto'}}>
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
  