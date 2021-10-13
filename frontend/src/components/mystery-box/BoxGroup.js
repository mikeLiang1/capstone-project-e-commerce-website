import React, { useState, useEffect} from 'react';

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
        {"itemName" : "", "imageUrl": "", "price" : "99.99", "chance": 20},
        {"itemName" : "", "imageUrl": "", "price" : "99.99", "chance": 20},
        {"itemName" : "", "imageUrl": "", "price" : "99.99", "chance": 20},
        {"itemName" : "", "imageUrl": "", "price" : "99.99", "chance": 20},
        {"itemName" : "", "imageUrl": "", "price" : "99.99", "chance": 20},
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
            
            if(boxName === 'standard_box') {
                console.log(img)
            }
            
            // Parse products
            
                console.log("PRINTING FOR " + boxName)
                let products = []
                for (var ID of Object.keys(data.box_data.Products)) {
                
                    const chance = data.box_data.Products[ID];
                    console.log(`chance is ${chance}`)
                    const productOptions = {
                        method: 'GET',
                        headers: {
                          'Content-Type': 'application/json',
                        }
                    }
                    console.log(ID)
                    console.log("so9joDSbO6U1xJsOMz7x")
                    
                    const productResponse = await fetch(`/product/${ID}`, productOptions)
                    
                    //console.log("Response")
                    
                    const productData = await productResponse.json()
                    
                    products.push({"itemName" : productData.data.name, "imageUrl": productData.data.image, "price": productData.data.price, "chance": chance})
                    console.log(productData.data)
                }
                setProducts(products)
        }
    }
    
    useEffect(() => {
        boxRequest()    
    }, [])
    

    
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
            Prize Pool:
            <div style={{ display:'flex', overflow:'auto'}}>
                {products.map((item, id) => (
                    <div className='outline'>
                        <div className="container">
                            <SmallItemContainer key = {id} itemName = {item.itemName} imageUrl = {item.imageUrl}>
                            </SmallItemContainer>
                            <div className ="chance"><p>{item.chance}%</p></div>
                        </div>
                        <b>RRP: ${item.price}</b>
                    </div>
                ))}
            </div>
            
        </div>
      </div>
    );
  }
  
  export default BoxGroup;
  