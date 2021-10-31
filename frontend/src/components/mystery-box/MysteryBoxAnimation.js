import React from 'react';
import { useState, useEffect } from 'react';
import MediumItemContainer from '../buttons-and-sections/MediumItemContainer';
import AngleUp from '../../images/angle-up-orange.svg';
import AngleDown from '../../images/angle-down-orange.svg';
import './MysteryBoxAnimation.css';
import MysteryBoxSpinner from './MysteryBoxSpinner';

function MysteryBoxAnimation() {
  var initial = [];
  for (var i = 0; i < 30; i++) {
    initial.push({
      id: i,
      content: <MediumItemContainer />,
    });
  }

  const [items, setItems] = useState(initial);
  const [possibleItems, setPossibleItems] = useState([]);
  const [prize, setPrize] = useState({
    productId: '',
    image: '',
  });

  // TODO: Get mystery box from the user's cart
  const getMysteryBoxItems = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch('/mystery_box/deluxe_box/open');
    if (response.status === 500) {
      alert('Error 500');
    } else if (response.status === 400) {
      alert('Failed to update product quantity! Error 400');
    } else if (response.status === 200) {
      const mysteryBoxData = await response.json();
      console.log('Deluxe Mystery Box Data: ', mysteryBoxData);
      const winningId = mysteryBoxData.opened[0];
      // Get the winning item's data
      const prizeResponse = await fetch(`/product/${mysteryBoxData.opened[0]}`);
      const prizeData = await prizeResponse.json();
      console.log('PrizeData: ', prizeData);
      var prizeInformation = {
        productId: mysteryBoxData.opened[0],
        image: prizeData.data.image,
      };

      setPrize(prizeInformation);

      // Set the list of possible items in the mystery box
      var possibleItemsTemp = [];
      for (var i = 0; i < mysteryBoxData.possible.length; i++) {
        // Make a fetch request for each possible item to get the product details
        const productResponse = await fetch(
          `/product/${mysteryBoxData.possible[i]}`,
          requestOptions
        );
        const productData = await productResponse.json();
        possibleItemsTemp.push(productData);
        setPossibleItems(possibleItemsTemp);
      }
    }

    var initialisedItems = [];
    for (var i = 0; i < 30; i++) {
      if (i === 2) {
        console.log('PrizeInfo: ', prizeInformation);
        initialisedItems.push({
          id: i,
          content: (
            <MediumItemContainer
              imageUrl={prizeInformation.image}
              productRouteId={prizeInformation.productId}
            />
          ),
        });
      } else {
        initialisedItems.push({
          id: i,
          content: <MediumItemContainer />,
        });
      }
    }
    setItems([...initialisedItems]);
  };

  useEffect(() => {
    getMysteryBoxItems();
  }, []);

  return (
    <div className='MysteryBoxAnimation'>
      <div className='MysteryBoxAnimation-text'>
        <h1 style={{ fontSize: '24px', fontWeight: '700' }}>
          NOCTA MYSTERY BOX
        </h1>
        <p>Opening Mystery Box...</p>
      </div>
      <img src={AngleDown} className='MysteryBoxAnimation-pointer' />
      <MysteryBoxSpinner
        key={items}
        items={items}
        possibleItems={possibleItems}
      />
      <img src={AngleUp} className='MysteryBoxAnimation-pointer' />
    </div>
  );
}

export default MysteryBoxAnimation;
