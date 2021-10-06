import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';

import './TextButton.css';

const TextButton = ({ buttonName }) => {
  return (
    <Button type="submit" variant='outlined'>{buttonName}</Button>
  );
};

export default TextButton;

TextButton.propTypes = {
  buttonName: PropTypes.string,
};
