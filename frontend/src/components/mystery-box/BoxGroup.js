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
    const [products, setProducts] = useState([
        {"itemName" : "", "imageUrl": "", "price" : "99.99"},
        {"itemName" : "", "imageUrl": "", "price" : "99.99"},
        {"itemName" : "", "imageUrl": "", "price" : "99.99"},
        {"itemName" : "", "imageUrl": "", "price" : "99.99"},
        {"itemName" : "", "imageUrl": "", "price" : "99.99"},
    ])
    
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
            
            // Parse products
            
            let products = []
            for (var key of Object.keys(data.box_data.Products)) {
                // const productResponse = await fetch('/product') have to get product id
                products.push({"itemName" : key, "imageURL": data.box_data.Image, "price": "99.99"})
                console.log("Hello item is" + key)
            }
            
            //if data.box_data.length !== 0 {
            // setProducts(products)
            //}
        }
    }
    
    boxRequest()
    
    
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
                {products.map((item, id) => (
                    <div className='outline'>
                        <SmallItemContainer key = {id} itemName = {item.itemName} imageUrl = {item.imageUrl}/>
                        <b>RRP: ${item.price}</b>
                    </div>
                ))}
            </div>
            
        </div>
      </div>
    );
  }
  
  export default BoxGroup;
  