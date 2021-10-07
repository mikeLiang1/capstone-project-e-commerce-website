import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Box sx={{ maxWidth: 130 }}>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select value={category} label='category' onChange={handleChange}>
          <MenuItem value={1}>Phone</MenuItem>
          <MenuItem value={2}>Computer</MenuItem>
          <MenuItem value={3}>Pheripheral</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
