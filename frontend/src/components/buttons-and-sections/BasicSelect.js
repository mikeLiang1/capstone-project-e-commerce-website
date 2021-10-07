import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ list }) {
  const [choice, setChoice] = React.useState('');

  const handleChange = (event) => {
    console.log(event.target.value);
    setChoice(event.target.value);
  };

  return (
    <Box sx={{ maxWidth: 130 }}>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select value={choice} label='category' onChange={handleChange}>
          <div>
            {list.map((val, key) => {
              return <MenuItem value={val}>{val}</MenuItem>;
            })}
          </div>
        </Select>
      </FormControl>
    </Box>
  );
}
