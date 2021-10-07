import React from 'react';
import BasicSelect from '../buttons-and-sections/BasicSelect.js';
import BasicTextField from '../buttons-and-sections/BasicTextField.js';

import './AddProductPage.css';

function AddProductPage() {
  return (
    <div id='AddProductPage'>
      <BasicSelect />
      <div id='AddProductPage-flexbox'>
        <div>hello</div>
        <div>world</div>
        <div>
          <BasicTextField textName='Product Name' />
        </div>
      </div>
    </div>
  );
}

export default AddProductPage;
