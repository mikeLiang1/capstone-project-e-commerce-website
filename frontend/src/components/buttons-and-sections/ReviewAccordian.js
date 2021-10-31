import React, { useEffect, useState, useRef } from 'react';
import { Button, LinearProgress, Grid, Typography } from '@material-ui/core';
import { linearProgressClasses } from '@mui/material';
import { styled } from '@material-ui/styles';

import Arrow from '../../images/angle-down.svg';

import './ReviewAccordian.css';

/* Documentation */
/*
  title: The "title"/text that will always be visible when the accordian is expanded or hidden
  content: The content that will be displayed when the accordian is expanded. The content should be a component or an
  array of components. e.g. For an "Accordian" used in the Shopping Cart page, the content is an array of "CartItem.js"
  components, i.e. content = [<CartItem itemName="Airpods"/>, <CartItem itemName="Macbook"/>, <CartItem itemName="iPhone" />]


*/

function ReviewAccordian({ title, totalStars, content, writeFunc, sortFunc, loadFunc }) {
  const [toggle, setToggle] = useState(false);
  const [height, setHeight] = useState();

  const refHeight = useRef();
  const reviewsNum = totalStars.get('total');
  //todo rating snapshot to left
  // make linear progress bar fatter
  // change 1 star to 1★
  // fix scroll bar, it counts margintop of contents
  // remove load more button

  const RatingDistributionBar = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: '#C4C4C4',
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#F2E912',
    },
  }));

  useEffect(() => {
    setHeight(`${refHeight.current.scrollHeight}px`);
  }, []);

  const toggleState = () => {
    setToggle(!toggle);
  };

  return (
    <div className='Accordian'>
      <button onClick={toggleState} className='Accordian-visible'>
        <Typography className='Accordian-title' variant='h5'>{title}</Typography>
        <img className={toggle && 'active'} src={Arrow} />
      </button>
      <div
        className={toggle ? 'Accordian-toggle animated' : 'Accordian-toggle'}
        style={{ height: toggle ? `${height}` : '0px' }}
        ref={refHeight}
      >
        <div className='Accordian-top-misc' style={{ display: toggle===true ? 'block' : 'none' }}>
          <div className='Accordian-star-ratings-wrapper'>
            <Grid
              container
              spacing={1}
              direction='column'
              alignItems='flex-start'
            >
              <Grid item>
                <Typography variant='h6'>Rating Snapshot</Typography>
              </Grid>
              <Grid
                item
                xs={10}
                sm
                container
                spacing={1}
                alignItems='center'
                justifyContent='center'
              >
                <Grid item xs={2}>
                  <Typography>1★</Typography>
                </Grid>
                <Grid item xs={8}>
                  <RatingDistributionBar variant='determinate' value={totalStars.get(1) / reviewsNum * 100}/>
                </Grid>
                <Grid item xs={1}>
                  <Typography>{totalStars.get(1)}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>2★</Typography>
                </Grid>
                <Grid item xs={8}>
                  <RatingDistributionBar variant='determinate' value={totalStars.get(2) / reviewsNum * 100}/>
                </Grid>
                <Grid item xs={1}>
                  <Typography>{totalStars.get(2)}</Typography>
                </Grid>
                <Grid item xs={2}>
                <Typography>3★</Typography>
                </Grid>
                <Grid item xs={8}>
                  <RatingDistributionBar variant='determinate' value={totalStars.get(3) / reviewsNum * 100}/>
                </Grid>
                <Grid item xs={1}>
                  <Typography>{totalStars.get(3)}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>4★</Typography>
                </Grid>
                <Grid item xs={8}>
                  <RatingDistributionBar variant='determinate' value={totalStars.get(4) / reviewsNum * 100}/>
                </Grid>
                <Grid item xs={1}>
                  <Typography>{totalStars.get(4)}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>5★</Typography>
                </Grid>
                <Grid item xs={8}>
                  <RatingDistributionBar variant='determinate' value={totalStars.get(5) / reviewsNum * 100}/>
                </Grid>
                <Grid item xs={1}>
                  <Typography>{totalStars.get(5)}</Typography>
                </Grid>
              </Grid>
            </Grid> 
          </div>
          <div className='Accordian-buttons-top'>
            <Button
              onClick={() => {
                sortFunc();
              }}
              style={{
                backgroundColor: '#000000',
                color: '#FFFFFF',
                borderRadius: '16px',
                width: '200px',
              }}
              size='large'
              variant='contained'
            >
              Sort reviews
            </Button>
            <Button
              onClick={() => {
                writeFunc();
              }}
              style={{
                backgroundColor: '#000000',
                color: '#FFFFFF',
                borderRadius: '16px',
                width: '200px',
              }}
              size='large'
              variant='contained'
            >
              Write a review
            </Button>
          </div>
        </div>
        <div className='Accordian-content' style={{ display: toggle===true ? 'block' : 'none' }}>{content}</div>
        <div>
          <Button
            onClick={() => {
              loadFunc();
            }}
            style={{
              backgroundColor: '#C4C4C4',
              color: '#000000',
              borderRadius: '16px',
              width: '400px',
              marginBottom: '30px'
            }}
            size='large'
            variant='contained'
          >
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ReviewAccordian;
