import React, { useState, useEffect } from 'react';
import { animated, interpolate } from 'react-spring/hooks';

function Card(props) {
  const { i, x, y, rot, scale, trans, bind, products } = props;
  const [info, setInfo] = useState(false);

  useEffect(() => {
    if (products.length !== 0) {
      setInfo(true);
      console.log(products);
    }
  }, [products]);

  return (
    <animated.div
      key={i}
      style={{
        transform: interpolate(
          [x, y],
          (x, y) => `translate3d(${x}px,${y}px,0)`
        ),
      }}
    >
      <animated.div
        {...bind(i)}
        style={{
          transform: interpolate([rot, scale], trans),
        }}
      >
        <h2>{products[i].name}</h2>
      </animated.div>
    </animated.div>
  );
}

export default Card;
