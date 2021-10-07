import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';

import './TextButton.css';

function TextButton({buttonName, buttonType}) {
  return (
    <Button type={`${buttonType}`} style={{backgroundColor: '#000000', color: '#FFFFFF', borderRadius: '16px'}} variant="contained">{buttonName}</Button>
  );
};

export default TextButton;

TextButton.propTypes = {
  buttonName: PropTypes.string,
  buttonType: PropTypes.string,
};
