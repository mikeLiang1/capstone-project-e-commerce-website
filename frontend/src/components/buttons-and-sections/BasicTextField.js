import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextField({ textName, value, handleChange }) {
  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { mt: 1, mb: 1, width: '35ch' },
      }}
      noValidate
      autoComplete='off'
    >
      <TextField
        id='outlined-multiline-flexible'
        label={textName}
        multiline
        maxRows={8}
        size='small'
        value={value}
        onChange={handleChange}
      />
    </Box>
  );
}
