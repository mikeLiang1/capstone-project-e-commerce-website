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

function AddProductPage() {
  const { register, handleSubmit } = useForm();
  const [details, setDetails] = useState({
    category: '',
    name: '',
    img: '',
    price: '',
    tag: '',
    description: '',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const submitData = () => {
    console.log(details);
  };

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <input id='file-upload' {...register('picture')} type='file' />
            <button>Submit</button>
          </form>
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
