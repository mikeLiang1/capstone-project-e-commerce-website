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
        {"itemName" : "", "imageUrl": "", "price" : "99.99"},
        {"itemName" : "", "imageUrl": "", "price" : "99.99"},
        {"itemName" : "", "imageUrl": "", "price" : "99.99"},
        {"itemName" : "", "imageUrl": "", "price" : "99.99"},
        {"itemName" : "", "imageUrl": "", "price" : "99.99"},
    ])
    
    const [email, setEmail] = useState('qwewqe@qweoijqweo.com');
    const [fname, setFirstName] = useState('oqwiejwqoie');
    const [lname, setLastName] = useState('qweqwewq');
    const [password, setPassword] = useState('qweqweqwewqe');
    
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
            
            if (boxName === 'ultimate_box') {
                console.log("PRINTING FOR " + boxName)
                let products = []
                for (var ID of Object.keys(data.box_data.Products)) {
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
                    
                    const data = await productResponse.json()
                    
                    products.push({"itemName" : data.data.name, "imageUrl": data.data.image, "price": data.data.price})
                    console.log(data.data.image)
                }
                setProducts(products)
            }
            
            //if data.box_data.length !== 0 {
            // setProducts(products)
            //}
            
            /* 
                        const data = await response.json()
            console.log('Successful')
            console.log(data.box_data)
            setPrice(data.box_data.Price)
            setIMG(data.box_data.Image)
            
            // Parse products
            //console.log("Data")
            //console.log(Object.keys(data.box_data.Products).length)
            if (Object.keys(data.box_data.Products).length !== 0) {
                console.log("PRINTING FOR " + boxName)
                let products = []
                for (var ID of Object.keys(data.box_data.Products)) {
                    const productOptions = {
                        method: 'GET',
                        headers: {
                          'Content-Type': 'application/json',
                        }
                    }
                    console.log(ID)
                    ID = ID.substring(1);
                    console.log(ID)
                    const productResponse = await fetch(`/product/${ID}`, productOptions)
                    
                    //console.log("Response")
                    if (productResponse.status === 200) {
                        const productData = await productResponse.json()
                    
                        products.push({"itemName" : productData.data.name, "imageUrl": productData.data.image, "price": productData.data.price})
                        console.log(data.data.image)
                    }
                }
        
                setProducts(products)
            }
            */
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
  