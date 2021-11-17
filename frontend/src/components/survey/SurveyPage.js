import React, { useState, useEffect } from 'react';
import { useSprings } from 'react-spring/hooks';
import { useGesture } from 'react-with-gesture';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import SmallItemContainer from '../buttons-and-sections/SmallItemContainer';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import Card from './Card';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Cookies from 'js-cookie';

import './SurveyPage.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function SurveyPage() {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  function ran(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const resu = ran(0, 9);
  const [dialogOpen, setDialog] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = useState(['Default', '', '99']);
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

  let it = 9;
  let loved = [];
  let list = [];
  let dir = 0;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const addToCart = async () => {
    const addToCartBody = {
      uid: Cookies.get('user'),
      productId: products[0].id,
      productQuantity: 1,
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(addToCartBody),
    };

    const response = await fetch('/cart', requestOptions);
    if (response.status != 200) {
      setError('Failed to add to cart!');
      setOpen(true);
    } else if (response.status === 200) {
      const data = await response.json();
    }
    setTimeout(() => gone.clear() || set((i) => to(i)), 600);
    setDialog(false);
    setOpen(true);
  };

  const restart = () => {
    setTimeout(() => gone.clear() || set((i) => to(i)), 600);
    setDialog(false);
  };

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
        setError('Failed to get Products!');
        setOpen(true);
      } else if (response.status === 200) {
        const data = await response.json();
        let items = [];

        for (var i = 0; i < data.products.length; i++) {
          items.push({
            name: data.products[i].content.name,
            img: data.products[i].content.image,
            price: data.products[i].content.price,
            id: data.products[i].content.id,
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

      if (!down && gone.size === cards.length) {
        console.log(loved);
        setDialog(true);
      }
    }
  );

  return (
    <div>
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
      <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby='alert-dialog-slide-description'
      >
        <div className='dialogContent'>
          <DialogTitle>{'RECOMMENDED PRODUCT!'}</DialogTitle>
          <SmallItemContainer
            itemName={products[resu].name}
            imageUrl={products[resu].img}
          />
          <b>RRP: ${products[resu].price}</b>
          <DialogActions>
            <Button onClick={() => addToCart()}>Add to Cart</Button>
          </DialogActions>
          <DialogActions>
            <Button onClick={() => restart()}>Retry</Button>
          </DialogActions>
        </div>
      </Dialog>

      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity='success'
            sx={{ width: '100%' }}
          >
            Added to Cart!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}

export default SurveyPage;
