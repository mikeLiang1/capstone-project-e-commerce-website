import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './AddProductPage.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVOqrvODx6KS-xBGs5guJTrKBJjduEjRI",
  authDomain: "nocta-tech.firebaseapp.com",
  projectId: "nocta-tech",
  storageBucket: "nocta-tech.appspot.com",
  messagingSenderId: "1002605988200",
  appId: "1:1002605988200:web:e91efebc3765fd58b0eedd",
  measurementId: "G-5HBFEX2BNM"
};

const firebaseApp = initializeApp(firebaseConfig);
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);


function AddProductPage() {
  const { register, handleSubmit } = useForm();
  
  const [image, setImage] = useState(null)
  const [details, setDetails] = useState({
    category: '',
    name: '',
    image: '',
    price: '',
    tag: '',
    description: '',
  });

  const submitData = async () => {
      
    // Uploading image to retrieve link
    const storageRef = ref(storage, image.name)
      
    let snapshot = await uploadBytes(storageRef, image)
    
    let url = await getDownloadURL(ref(storage, image.name))
    
    details.image = url
    console.log(details);
  };
  
  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }
  
  return (
    <div id='AddProductPage'>
      <Box sx={{ maxWidth: 130 }}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={details.category}
            label='category'
            onChange={(e) =>
              setDetails({ ...details, category: e.target.value })
            }
          >
            <MenuItem value='phone'>Phone</MenuItem>
            <MenuItem value='computer'>Computer</MenuItem>
            <MenuItem value='pheripheral'>Pheripheral</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div id='AddProductPage-flexbox'>
        <div>
            <input id='file-upload' onChange={handleChange} type='file' />
        </div>
        <div>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete='off'
          >
            <TextField
              label='Product Name'
              multiline
              maxRows={8}
              value={details.name}
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
            />
          </Box>
        </div>
        <div>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete='off'
          >
            <TextField
              label='Price'
              multiline
              maxRows={8}
              value={details.price}
              onChange={(e) =>
                setDetails({ ...details, price: e.target.value })
              }
            />
          </Box>
        </div>
        <div>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete='off'
          >
            <TextField
              label='Tag'
              multiline
              maxRows={8}
              value={details.tag}
              onChange={(e) => setDetails({ ...details, tag: e.target.value })}
            />
          </Box>
        </div>
        <div>Description</div>
        <div>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete='off'
          >
            <TextField
              label='Description'
              multiline
              maxRows={8}
              value={details.description}
              onChange={(e) =>
                setDetails({ ...details, description: e.target.value })
              }
            />
          </Box>
        </div>
        <div>
          <Button
            onClick={() => {
              submitData();
            }}
            type='submit'
            style={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              borderRadius: '16px',
            }}
            variant='contained'
          >
            Upload Product
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddProductPage;
