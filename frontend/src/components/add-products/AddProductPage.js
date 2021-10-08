import React from 'react';
import BasicSelect from '../buttons-and-sections/BasicSelect.js';
import BasicTextField from '../buttons-and-sections/BasicTextField.js';
import { useForm } from 'react-hook-form';

import './AddProductPage.css';

function AddProductPage() {
  const categoryList = ['Phone', 'Computer', 'Pheripheral'];
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div id='AddProductPage'>
      <BasicSelect name='Category' list={categoryList} />
      <div id='AddProductPage-flexbox'>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <button>
              <label for='file-upload'>Choose a fucking picture</label>
              <input
                id='file-upload'
                {...register('picture')}
                type='file'
                style={{ display: 'none' }}
              />
            </button>
            <button>Submit</button>
          </form>
        </div>
        <div>
          <BasicTextField textName='Product Name' />
        </div>
        <div>
          <BasicTextField textName='Price' />
        </div>
        <div>
          <BasicTextField textName='Tags' />
        </div>
        <div>Description</div>
        <div>
          <BasicTextField textName='Describe your product' />
        </div>
      </div>
    </div>
  );
}

export default AddProductPage;
