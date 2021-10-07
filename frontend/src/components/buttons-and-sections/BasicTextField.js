import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields({ textName }) {
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

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
