import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ name, list }) {
  const [choice, setChoice] = React.useState('');

  const handleChange = (event) => {
    setChoice(event.target.value);
  };

  return (
    <Box sx={{ maxWidth: 130 }}>
      <FormControl fullWidth>
        <InputLabel>{name}</InputLabel>
        <Select value={choice} label={name} onChange={handleChange}>
          {list.map((val, key) => {
            return (
              <MenuItem key={key} value={val}>
                {val}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
