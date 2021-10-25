import React, { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { useHistory } from "react-router-dom";


function Search() {

  const [products, setProducts] = useState(top100Films)
  const [searchValue, setValue] = useState({"title": ""})
  const history = useHistory()
  
  // Fetch returning ALL products in a array of JSON objects
  async function getProducts() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    };
    
    const response = await fetch('/product/all', requestOptions);
    const productList = await response.json();
    
    const options = productList.products.map((option) => {
      return {
        firstLetter: option.category,
        ...option,
      };
    });
    
    options.sort((a, b) => -b.category.localeCompare(a.category))
    setProducts(options)
  }
  
  useEffect(() => {
    getProducts() 
  }, [])
  
  function handleSubmit() {
    console.log(searchValue)
    if (searchValue !== null) {
      history.push("/product/" + searchValue.id)
    }
  }
  

  return (
      <div
        style={{display: 'flex'}}
      >
        <Autocomplete
          value={searchValue} 
          onChange={(e, newValue) => setValue(newValue)}
          options={products}
          groupBy={(option) => option.category}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => <TextField {...params} label="Search for product" />}
          sx = {{ width: '600px'}}
        />
        <IconButton onClick = {handleSubmit} aria-label="search">
          <SearchIcon />
        </IconButton>
        
      </div>
  )
}

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
];

export default Search