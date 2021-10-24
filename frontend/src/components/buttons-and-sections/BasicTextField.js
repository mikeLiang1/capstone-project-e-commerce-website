import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextField({
  textName,
  value,
  handleChange,
  type,
  id,
}) {
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
        id={id}
        type={type}
        label={textName}
        size='small'
        value={value}
        onChange={handleChange}
      />
    </Box>
  );
}
