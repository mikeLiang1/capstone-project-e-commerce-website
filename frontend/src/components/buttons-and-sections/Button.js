import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

const Button = ({ buttonName }) => {
  return <button class='button'>{buttonName}</button>;
};

export default Button;

Button.propTypes = {
  buttonName: PropTypes.string,
};
