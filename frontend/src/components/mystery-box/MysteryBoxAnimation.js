import React from 'react';
import { useState, useEffect } from 'react';
import MediumItemContainer from '../buttons-and-sections/MediumItemContainer';
import AngleUp from '../../images/angle-up-orange.svg';
import AngleDown from '../../images/angle-down-orange.svg';
import './MysteryBoxAnimation.css';
import MysteryBoxSpinner from './MysteryBoxSpinner';
import Cookies from 'js-cookie';

function MysteryBoxAnimation({ match }) {
  var initial = [];
  for (var i = 0; i < 30; i++) {
    initial.push({
      id: i,
      content: <MediumItemContainer />,
    });
  }

  const [items, setItems] = useState(initial);
  const [prize, setPrize] = useState({
    productId: '',
    image: '',
    name: '',
    price: 0,
  });

  // TODO: Get mystery box from the user's cart
  const getMysteryBoxItems = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(
      `/mystery_box/${match.params.boxName}/open`,
      requestOptions
    );
    if (response.status === 500) {
      alert('Error 500');
    } else if (response.status === 400) {
      alert('Failed to update product quantity! Error 400');
    } else if (response.status === 200) {
      const mysteryBoxData = await response.json();
      const winningId = mysteryBoxData.opened[0];
      // Get the winning item's data
      const prizeResponse = await fetch(
        `/product/${winningId}`,
        requestOptions
      );
      const prizeData = await prizeResponse.json();
      console.log('PrizeData: ', prizeData);
      var prizeInformation = {
        productId: mysteryBoxData.opened[0],
        name: prizeData.data.name,
        image: prizeData.data.image,
        price: prizeData.data.price,
        category: prizeData.data.category,
      };
      setPrize(prizeInformation);

      // Add the winning item to the user's cart free of charge
      const addToCartBody = {
        uid: Cookies.get('user'),
        productId: winningId,
      };
      console.log(addToCartBody);
      const addOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(addToCartBody),
      };

      await fetch('/cart/add_free', addOptions);

      // Set the list of possible items in the mystery box
      var possibleItemsTemp = [];
      for (var key in mysteryBoxData.possible) {
        possibleItemsTemp.push({
          productId: key,
          chance: mysteryBoxData.possible[key],
          image: '',
          price: 0,
        });
      }
      // Order the list of possible items by chance [highest chance first, ... , lowest chance last]
      possibleItemsTemp.sort(compare);

      // For each possible item, except for the winning item, get the item's data
      for (var i = 0; i < possibleItemsTemp.length; i++) {
        // Skip fetch request if item is the winning item, since we already fetched it's details
        if (possibleItemsTemp[i].productId === winningId) {
          possibleItemsTemp[i].image = prizeData.data.image;
          possibleItemsTemp[i].price = prizeData.data.price;
        } else {
          // Make a fetch request for each possible item to get the product details
          const itemResponse = await fetch(
            `/product/${possibleItemsTemp[i].productId}`,
            requestOptions
          );
          const itemData = await itemResponse.json();
          possibleItemsTemp[i].image = itemData.data.image;
          possibleItemsTemp[i].price = itemData.data.price;
        }
      }
    }
    console.log('After fetch requests... ', possibleItemsTemp);

    // Set the possible items and the prize retrieved from the backend
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
        // Select random weighted item
        var randomItem = randomChoice(possibleItemsTemp);
        console.log('Iteration: ' + i + ' Chosen Item: ', randomItem);
        initialisedItems.push({
          id: i,
          content: (
            <MediumItemContainer
              imageUrl={randomItem.image}
              productRouteId={randomItem.productId}
            />
          ),
        });
      }
    }
    setItems([...initialisedItems]);
  };

  const compare = (possibleItem01, possibleItem02) => {
    if (possibleItem01.chance < possibleItem02.chance) {
      return 1;
    }
    if (possibleItem01.chance > possibleItem02.chance) {
      return -1;
    }
    return 0;
  };

  const randomChoice = (possibleItemList) => {
    const threshold = Math.random() * 100;
    var total = 0;
    // Loop through our possible items to find out which item and it's corresponding weight
    // will belong inside the threshold. We need to keep a running couunt of our weights
    for (let i = 0; i < possibleItemList.length; i++) {
      total += possibleItemList[i].chance;
      if (threshold <= total) {
        return possibleItemList[i];
      }
    }
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
      <MysteryBoxSpinner items={items} prize={prize} />
      <img src={AngleUp} className='MysteryBoxAnimation-pointer' />
    </div>
  );
}

export default MysteryBoxAnimation;
