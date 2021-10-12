import React from 'react';

import './HomePageGuest.css';
import HomePageImage from '../../images/HomePageImage.png';
import AboutSection from '../buttons-and-sections/AboutSection';
import TrendingSection from '../buttons-and-sections/TrendingSection';
import RecommendedSection from '../buttons-and-sections/RecommendedSection';
import RecommendMeProductsSection from '../buttons-and-sections/RecommendMeProductsSection';
import Cookies from 'js-cookie';

function HomePageGuest({ token }) {
  let recommendedProductsSection = <div></div>;
  let recommendMeProductsSection = <div></div>;
  // If the user is logged in, display their recommended section
  if (token === Cookies.get('user')) {
    recommendedProductsSection = <RecommendedSection />;
    recommendMeProductsSection = <RecommendMeProductsSection />;
  }

  return (
    <div className='HomePageGuest'>
      <div className='HomePageGuest-image-container'>
        <img
          src={HomePageImage}
          className='HomePageGuest-image'
          alt='Nocta Technology Background Image'
        ></img>
      </div>
      <AboutSection />
      <TrendingSection />
      {recommendedProductsSection}
      {recommendMeProductsSection}
    </div>
  );
}

export default HomePageGuest;
