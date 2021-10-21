import React, { useState, useEffect } from 'react';
import { useSprings } from 'react-spring/hooks';
import { useGesture } from 'react-with-gesture';
import Card from './Card';

import './SurveyPage.css';

function SurveyPage() {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  let it = 9;
  let loved = [];

  const [products, setProducts] = useState([
    { name: 'Loading', img: 'Loading' },
    { name: 'Loading', img: 'Loading' },
    { name: 'Loading', img: 'Loading' },
    { name: 'Loading', img: 'Loading' },
    { name: 'Loading', img: 'Loading' },
    { name: 'Loading', img: 'Loading' },
    { name: 'Loading', img: 'Loading' },
    { name: 'Loading', img: 'Loading' },
    { name: 'Loading', img: 'Loading' },
    { name: 'Loading', img: 'Loading' },
  ]);

  let list = [];
  let dir = 0;

  const to = (i) => ({
    x: 0,
    y: i * -10,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
  });
  const from = (i) => ({ rot: 0, scale: 1.5, y: -1000 });

  const trans = (r, s) =>
    `perspective(1500px) rotateX(30deg) rotateY(${
      r / 10
    }deg) rotateZ(${r}deg) scale(${s})`;
  const [gone] = useState(() => new Set());

  useEffect(() => {
    const getProducts = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      };

      const response = await fetch('/product/1/11', requestOptions);

      if (response.status !== 200) {
        alert('Failed to get Products!');
      } else if (response.status === 200) {
        const data = await response.json();
        let items = [];
        console.log(data);
        for (var i = 0; i < data.products.length; i++) {
          items.push({
            name: data.products[i].content.name,
            img: data.products[i].content.image,
          });
        }
        setProducts(items);
        list = items;
      }
    };
    getProducts();
  }, []);

  const [props, set] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  const bind = useGesture(
    ({ args: [index], down, delta: [xDelta], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2;

      dir = xDir < 0 ? -1 : 1;

      if (!down && trigger) {
        if (dir === 1) {
          console.log('swiped right');
          loved.push(list[it]);
        }
        if (dir === -1) {
          console.log('swiped left');
        }
        it--;
        gone.add(index);
      }

      set((i) => {
        if (index !== i) return;
        const isGone = gone.has(index);

        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;

        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);

        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });

      if (!down && gone.size === cards.length) console.log(loved);
    }
  );

  return (
    <div id='SurveyPage'>
      {props.map(({ x, y, rot, scale }, i) => (
        <Card
          key={i}
          i={i}
          x={x}
          y={y}
          rot={rot}
          scale={scale}
          trans={trans}
          bind={bind}
          products={products}
        />
      ))}
    </div>
  );
}

export default SurveyPage;
