import React from 'react';

import './HomePageGuest.css';
import HomePageImage from '../../images/HomePageImage.png';
import AboutSection from '../buttons-and-sections/AboutSection';
import TrendingSection from '../buttons-and-sections/TrendingSection';

function HomePageGuest() {
  return (
    <div class='HomePageGuest'>
      <div class='HomePageGuest-image-container'>
        <img
          src={HomePageImage}
          class='HomePageGuest-image'
          alt='Nocta Technology Background Image'
        ></img>
      </div>
      <AboutSection />
      <TrendingSection />
    </div>
  );
}

export default HomePageGuest;
