import React from 'react';

import './AdminHomePage.css';
import HomePageImage from '../../images/HomePageImage.png';
import AboutSection from '../buttons-and-sections/AboutSection';
import TrendingSection from '../buttons-and-sections/TrendingSection';

function AdminHomePage() {
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
    </div>
  );
}

export default AdminHomePage;
