import React, { useState } from 'react';

import './AboutSection.css';
import SmallItemContainer from './SmallItemContainer';

function AboutSection() {
  const [items, setItems] = useState([
    {
      id: 1,
      content: (
        <SmallItemContainer
          itemName='Apple'
          imageUrl={require('../../images/brand-logos/Apple-Logo.png').default}
        />
      ),
    },
    {
      id: 2,
      content: (
        <SmallItemContainer
          itemName='Microsoft'
          imageUrl={
            require('../../images/brand-logos/Microsoft-Logo.png').default
          }
        />
      ),
    },
    {
      id: 3,
      content: (
        <SmallItemContainer
          itemName='Google'
          imageUrl={require('../../images/brand-logos/Google-Logo.png').default}
        />
      ),
    },
    {
      id: 4,
      content: (
        <SmallItemContainer
          itemName='Samsung'
          imageUrl={
            require('../../images/brand-logos/Samsung-Logo.png').default
          }
        />
      ),
    },
    {
      id: 5,
      content: (
        <SmallItemContainer
          itemName='Sony'
          imageUrl={require('../../images/brand-logos/Sony-Logo.png').default}
        />
      ),
    },
    {
      id: 6,
      content: (
        <SmallItemContainer
          itemName='Bose'
          imageUrl={require('../../images/brand-logos/Bose-Logo.png').default}
        />
      ),
    },
    {
      id: 7,
      content: (
        <SmallItemContainer
          itemName='HP'
          imageUrl={require('../../images/brand-logos/HP-Logo.png').default}
        />
      ),
    },
    {
      id: 8,
      content: (
        <SmallItemContainer
          itemName='LG'
          imageUrl={require('../../images/brand-logos/LG-Logo.png').default}
        />
      ),
    },
    {
      id: 9,
      content: (
        <SmallItemContainer
          itemName='Nintendo'
          imageUrl={
            require('../../images/brand-logos/Nintendo-Logo.png').default
          }
        />
      ),
    },
    {
      id: 10,
      content: (
        <SmallItemContainer
          itemName='Razer'
          imageUrl={require('../../images/brand-logos/Razer-Logo.png').default}
        />
      ),
    },
  ]);

  return (
    <div className='AboutSection'>
      <div className='AboutSection-information'>
        <h1>EST. 2021</h1>
        <br></br>
        <p>
          <span style={{ color: '#FF7A00' }}>NOCTA TECHNOLOGY</span> is a brand
          dedicated to offering the highest quality technology software and
          hardware from a variety of partnered brands, including Apple,
          Microsoft, Google, Samsung, Sony, and more...
        </p>
      </div>
      <div className='AboutSection-brands-section'>
        {items.map((item) => (
          <div key={item.id}>{item.content}</div>
        ))}
      </div>
    </div>
  );
}

export default AboutSection;
