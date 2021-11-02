import React, { useEffect, useState, useRef } from 'react';
import { Button, LinearProgress, Grid, Typography, Menu, MenuItem, Fade, ListItemText } from '@material-ui/core';
import { linearProgressClasses } from '@mui/material';
import { styled } from '@mui/material/styles';

import Arrow from '../../images/angle-down.svg';

import './ReviewAccordian.css';

/* Documentation */
/*
  title: The "title"/text that will always be visible when the accordian is expanded or hidden
  content: The content that will be displayed when the accordian is expanded. The content should be a component or an
  array of components. e.g. For an "Accordian" used in the Shopping Cart page, the content is an array of "CartItem.js"
  components, i.e. content = [<CartItem itemName="Airpods"/>, <CartItem itemName="Macbook"/>, <CartItem itemName="iPhone" />]


*/

function ReviewAccordian
({ title, totalStars, totalReviewsNum, currentReviewsNum, sortMethod, content, writeFunc, sortFunc, loadFunc }) {
  const [toggle, setToggle] = useState(false);
  const [height, setHeight] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  // Prevent division by zero
  var reviewsNum;
  if (totalReviewsNum === 0) reviewsNum = 1;
  else reviewsNum = totalReviewsNum;

  const refHeight = useRef();

  const RatingDistributionBar = styled(LinearProgress)(({ theme }) => ({
    height: 13,
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

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuSelect = (selected_sort) => {
    sortFunc(selected_sort);
    handleMenuClose();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
          <div className='Accordian-buttons-top'>
            <Button
              onClick={handleMenu}
              style={{
                backgroundColor: '#000000',
                color: '#FFFFFF',
                borderRadius: '16px',
                width: '300px',
              }}
              size='large'
              variant='contained'
            >
              Sort by: {sortMethod}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
              TransitionComponent={Fade}
              style={{ marginTop: '50px' }}
            >
              <MenuItem onClick={() => {handleMenuSelect('date(newest)')}} style={{ width: '300px' }}>
                <ListItemText style={{ textAlign: 'center' }}>Date(Newest)</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => {handleMenuSelect('date(oldest)')}} style={{ width: '300px' }}>
                <ListItemText style={{ textAlign: 'center' }}>Date(Oldest)</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => {handleMenuSelect('ratings(highest)')}} style={{ width: '300px' }}>
                <ListItemText style={{ textAlign: 'center' }}>Ratings(Highest)</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => {handleMenuSelect('ratings(lowest)')}} style={{ width: '300px' }}>
                <ListItemText style={{ textAlign: 'center' }}>Ratings(Lowest)</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => {handleMenuSelect('likes received')}} style={{ width: '300px' }}>
                <ListItemText style={{ textAlign: 'center' }}>Likes Received</ListItemText>
              </MenuItem>
            </Menu>
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
          <Grid
            container
            spacing={1}
            direction='column'
            alignItems='flex-start'
            className='Accordian-star-ratings-wrapper'
            style={{ marginTop: '-40px', width: '50%' }}
          >
            <Grid item>
              <Typography variant='h6' style={{ marginLeft: '30px' }}>Rating Snapshot</Typography>
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
        <div
          className='Accordian-content'
          style={{ display: toggle===true ? 'block' : 'none' }}
        >
          {content}
        </div>
        <div
          className='Accordian-content'
          style={{ display: toggle===true && totalReviewsNum === 0 ? 'block' : 'none' }}
        >
          <Typography
            variant='h4'
            style={{ paddingTop: '80px', paddingBottom: '100px' }}
          >
            No reviews to show
          </Typography>
        </div>
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
              marginBottom: '30px',
              display: toggle===true && currentReviewsNum < totalReviewsNum ? 'block' : 'none'
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
