import React from 'react';
import PropTypes from 'prop-types';

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Button } from '@material-ui/core';

import './TextButton.css';

const TextButton = ({ buttonName, buttonType="" }) => {

  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: '#000000',
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#11cb5f',
      },
    },
  });
  
  return (
    <ThemeProvider theme={theme}>
      <Button type={`${buttonType}`} color="secondary" variant='contained'>{buttonName}</Button>
    </ThemeProvider>
  );
};

export default TextButton;

TextButton.propTypes = {
  buttonName: PropTypes.string,
  buttonType: PropTypes.string,
};
