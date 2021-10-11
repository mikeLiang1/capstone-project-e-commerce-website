import React from 'react';

import './HomePageGuest.css';
import HomePageImage from '../../images/HomePageImage.png';
import AboutSection from '../buttons-and-sections/AboutSection';
import TrendingSection from '../buttons-and-sections/TrendingSection';
import RecommendedSection from '../buttons-and-sections/RecommendedSection';

function HomePageGuest({ user }) {
  let recommendedSection = <div></div>;
  // If the user is logged in, display their recommended section
  if (user) {
    recommendedSection = <RecommendedSection />;
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
      {recommendedSection}
    </div>
  );
}

export default HomePageGuest;
