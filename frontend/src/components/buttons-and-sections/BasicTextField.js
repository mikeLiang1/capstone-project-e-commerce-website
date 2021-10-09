import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextFields(props) {
  const [value, setValue] = React.useState('');
  const [details, setDetails] = React.useState(props);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // React.useEffect(() => {
  //   setDetails({ ...details, category: 'e' });
  // }, [props]);

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
        label={props.textName}
        multiline
        maxRows={8}
        value={value}
        onChange={handleChange}
      />
    </Box>
  );
}
