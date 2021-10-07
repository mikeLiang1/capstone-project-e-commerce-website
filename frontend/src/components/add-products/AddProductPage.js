import React from 'react';
import BasicSelect from '../buttons-and-sections/BasicSelect.js';
import BasicTextField from '../buttons-and-sections/BasicTextField.js';

import './AddProductPage.css';

function AddProductPage() {
  const categoryList = ['Phone', 'Computer', 'Pheripheral'];

  return (
    <div id='AddProductPage'>
      <BasicSelect list={categoryList} />
      <div id='AddProductPage-flexbox'>
        <div>hello</div>
        <div>world</div>
        <div>
          <BasicTextField textName='Product Name' />
        </div>
        <div>
          <BasicTextField textName='Price' />
        </div>
        <div>
          <BasicTextField textName='Tags' />
        </div>
      </div>
    </div>
  );
}

export default AddProductPage;
