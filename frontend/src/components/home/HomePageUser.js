import React from 'react';

import './HomePageUser.css';
import HomePageImage from '../../images/HomePageImage.png';
import AboutSection from '../buttons-and-sections/AboutSection';
import TrendingSection from '../buttons-and-sections/TrendingSection';
import RecommendedSection from '../buttons-and-sections/RecommendedSection';

function HomePageUser() {
  return (
    <div className='HomePageUser'>
      <div className='HomePageUser-image-container'>
        <img
          src={HomePageImage}
          className='HomePageUser-image'
          alt='Nocta Technology Background Image'
        ></img>
      </div>
      <AboutSection />
      <TrendingSection />
      <RecommendedSection />
    </div>
  );
}

export default HomePageUser;
