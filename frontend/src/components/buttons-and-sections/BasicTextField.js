import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextField({ textName, value, handleChange }) {
  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
    >
      <TextField
        id='outlined-multiline-flexible'
        label={textName}
        multiline
        maxRows={4}
        value={value}
        onChange={handleChange}
      />
    </Box>
  );
}
