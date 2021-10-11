import React from 'react';

import BoxGroup from './BoxGroup';

import './MysteryBoxPage.css';

function MysteryBoxPage() {
  return (
    <div className='boxPage'>
      <div className='outline'>
        <p>
          <span style={{ color: '#FF7A00' }}>NOCTA TECHNOLOGY</span> offers five unique mystery boxes at different price points.<br/>
          Each mystery box gives you the chance to win a variety of different items - only one item is “won” per mystery box.<br/>
          Mystery boxes are priced accordingly to the probability of receiving a valuable item. <br/>
          The prize pool for each type of mystery box is shown on the right. <br/>
          You will have the chance to win <span style={{ color: '#FF7A00' }}>one</span> item from the prize pool.<br/>
        </p>  
      </div>
      <BoxGroup boxName="nocta_box"/>
      <BoxGroup boxName="deluxe_box"/>
      <BoxGroup boxName="ultimate_box"/>
      <BoxGroup boxName="epic_box"/>
      <BoxGroup boxName="standard_box"/>
    </div>
  );
}

export default MysteryBoxPage;
