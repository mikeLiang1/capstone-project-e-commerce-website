import React, { useState, useEffect } from 'react';
import { useSprings } from 'react-spring/hooks';
import { useGesture } from 'react-with-gesture';
import Card from './Card';

import './SurveyPage.css';

function SurveyPage() {
  const cards = [1, 2, 3];

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
  const [products, setProducts] = useState([]);

  const [props, set] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  const getProducts = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const response = await fetch('/product/1/4', requestOptions);

    if (response.status !== 200) {
      alert('Failed to get Trending Products!');
    } else if (response.status === 200) {
      const data = await response.json();
      let items = [];
      for (var i = 0; i < data.products.length; i++) {
        items.push({
          name: data.products[i].content.name,
          image: data.products[i].content.image,
          routeId: data.products[i].id,
        });
      }
      setProducts(items);
    }
  };

  const bind = useGesture(
    ({ args: [index], down, delta: [xDelta], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2;

      const dir = xDir < 0 ? -1 : 1;

      if (!down && trigger) {
        if (dir === 1) console.log('swiped right');
        if (dir === -1) console.log('swiped left');
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

      if (!down && gone.size === cards.length)
        setTimeout(() => gone.clear() || set((i) => to(i)), 600);
    }
  );

  useEffect(() => {
    getProducts();
  }, []);

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
          products={products}
          bind={bind}
        />
      ))}
    </div>
  );
}

export default SurveyPage;
