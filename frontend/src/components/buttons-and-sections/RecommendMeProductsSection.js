import React from 'react';
import TextButton from './TextButton';
import { Link } from 'react-router-dom';

import './RecommendMeProductsSection.css';

function RecommendMeProductsSection() {
  return (
    <div className='RecommendMeProductsSection'>
      <h2 style={{ fontSize: '24px' }}>RECOMMEND ME PRODUCTS</h2>
      <div className='RecommendMeProductsSection-section'>
        <Link to='/survey' className='RecommendMeProductsSection-link'>
          <TextButton buttonName='Swipe Survey' buttonType='button' />
        </Link>
      </div>
    </div>
  );
}

export default RecommendMeProductsSection;
