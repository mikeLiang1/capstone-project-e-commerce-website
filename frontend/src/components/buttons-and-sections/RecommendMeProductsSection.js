import React from 'react';
import TextButton from './TextButton';
import { Link } from 'react-router-dom';

import './RecommendMeProductsSection.css';

function RecommendMeProductsSection() {
  return (
    <div class='RecommendMeProductsSection'>
      <h2>RECOMMEND ME PRODUCTS</h2>
      <div class='RecommendMeProductsSection-section'>
        <Link to='/survey' class='RecommendMeProductsSection-link'>
          <TextButton buttonName='Swipe Survey' buttonType='button' />
        </Link>
      </div>
    </div>
  );
}

export default RecommendMeProductsSection;
