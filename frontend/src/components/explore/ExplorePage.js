import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Pagination, Typography, Button, Menu, MenuItem, Fade, ListItemText } from '@mui/material';

import ExploreProductContainer from '../buttons-and-sections/ExploreProductContainer.js';

import './ExplorePage.css';

function ExplorePage({ match }) {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });
  const tag = match.params.tag;
  const [open, setOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const [avgRatings, setAvgRatings] = useState(new Map());
  // determines sorting method
  const [sortMethod, setSortMethod] = useState('price(high-low)');
  // modified version of productList according to productSort
  const [productShow, setProductShow] = useState([]);
  // for pagination, determines the range of products
  const [productStart, setProductStart] = useState(0);

  const [loaded, setLoaded] = useState(false);

  const [page, setPage] = useState(1);
  // total page numbers
  const [pageNum, setPageNum] = useState(1);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handlePage = (e, value) => {
    setPage(value);
    setProductStart(value * 12 - 12);
    // for now im only showing 4 products coz we have only a few
    // setProductStart(value * 4 - 4);
  };

  async function getItems() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(`/explore/${tag}`, requestOptions);
    if (res.status !== 200) {
      setOpen(true);
    } else if (res.status === 200) {
      const data = await res.json();
      setProductList(data.products);
      const newArr = data.products.slice().sort(function (a, b) {
        var prod_a = a.content.price;
        var prod_b = b.content.price;
        if (prod_a > prod_b) return -1;
        if (prod_a < prod_b) return 1;
        return 0;
      });
      setProductShow(newArr);

      // Calculate average rating
      const newMap = new Map();

      for (var i = 0; i < data.products.length; i++) {
        var avgRating = 0;
        const reviewsNum = data.products[i].content.reviews.length;
        for (var j = 0; j < reviewsNum; j++) {
          avgRating += data.products[i].content.reviews[j].star_rating;
        }

        if (avgRating !== 0 && reviewsNum !== 0) {
          avgRating /= reviewsNum;
        }
        else avgRating = 0;

        newMap.set(data.products[i].id, avgRating);
      }

      setAvgRatings(newMap);

      setPageNum(Math.ceil(data.products.length / 12));
      setLoaded(true);
    }
  }

  useEffect(() => {
    getItems();
  }, [tag]);

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuSelect = (selectedSort) => {
    setSortMethod(selectedSort);

    if (selectedSort.startsWith('price')) {
      const newArr = productList.slice().sort(function (a, b) {
        var prod_a = a.content.price;
        var prod_b = b.content.price;
        if (prod_a > prod_b) return -1;
        if (prod_a < prod_b) return 1;
        return 0;
      });
      if (selectedSort === 'price(high-low)') {
        setProductShow(newArr);
      } else {
        setProductShow(newArr.reverse());
      }
    }
    else if (selectedSort.startsWith('ratings')) {
      // Sort productList
      const newArr = productList.slice().sort(function (a, b) {
        var prod_a = avgRatings.get(a.id);
        var prod_b = avgRatings.get(b.id);
        if (prod_a > prod_b) return -1;
        if (prod_a < prod_b) return 1;
        return 0;
      });
      if (selectedSort === 'ratings(high-low)') {
        setProductShow(newArr);
      } else {
        setProductShow(newArr.reverse());
      }
    }
    else if (selectedSort.startsWith('number of reviews')) {
      const newArr = productList.slice().sort(function (a, b) {
        var prod_a = a.content.reviews.length;
        var prod_b = b.content.reviews.length;
        if (prod_a > prod_b) return -1;
        if (prod_a < prod_b) return 1;
        return 0;
      });
      if (selectedSort === 'number of reviews(high-low)') {
        setProductShow(newArr);
      } else {
        setProductShow(newArr.reverse());
      }
    }

    handleMenuClose();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div id='ExplorePage' style={{ visibility: loaded ? 'visible' : 'hidden' }}>
      <div id='ExplorePage-tag'>
        <Typography style={{ marginLeft: '30px', marginTop: '10px' }}>
          {tag.toUpperCase()}
        </Typography>
      </div>
      <div id='ExplorePage-sort-menu'>
        <Button
          style={{
            backgroundColor: '#000000',
            color: '#FFFFFF',
            borderRadius: '16px',
            width: '400px',
            display: productList.length === 0 ? 'none' : 'block',
          }}
          size='large'
          variant='contained'
          onClick={handleMenu}
        >
          Sort by: {sortMethod}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={() => {handleMenuSelect('price(high-low)')}} style={{ width: '400px' }}>
            <ListItemText style={{ textAlign: 'center' }}>Price(High-Low)</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => {handleMenuSelect('price(low-high)')}} style={{ width: '400px' }}>
            <ListItemText style={{ textAlign: 'center' }}>Price(Low-High)</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => {handleMenuSelect('ratings(high-low)')}} style={{ width: '400px' }}>
            <ListItemText style={{ textAlign: 'center' }}>Ratings(High-Low)</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => {handleMenuSelect('ratings(low-high)')}} style={{ width: '400px' }}>
            <ListItemText style={{ textAlign: 'center' }}>Ratings(Low-High)</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => {handleMenuSelect('number of reviews(high-low)')}} style={{ width: '400px' }}>
            <ListItemText style={{ textAlign: 'center' }}>Number of reviews(High-Low)</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => {handleMenuSelect('number of reviews(low-high)')}} style={{ width: '400px' }}>
            <ListItemText style={{ textAlign: 'center' }}>Number of reviews(Low-High)</ListItemText>
          </MenuItem>
        </Menu>
      </div>
      <div id='ExplorePage-items-section'>
        {
          productShow
          .slice(productStart, productStart + 12)
          .map((prod, i) => {
            return (
              <ExploreProductContainer
                key={i}
                image={prod.content.image}
                name={prod.content.name}
                price={prod.content.price}
                id={prod.id}
                reviewsNum={prod.content.reviews.length}
                avgRating={avgRatings.get(prod.id)}
              />
            );
          })
        }
      </div>
      <div
        id='ExplorePage-empty-text'
        style={{ display: productList.length !== 0 ? 'none' : 'block' }}
      >
        <Typography variant='h4'>
          No products to show
        </Typography>
      </div>
      <Stack spacing={2} style={{ display: pageNum !== 0 ? 'block' : 'none' }}>
        <Pagination
          count={pageNum}
          page={page}
          onChange={handlePage}
          showFirstButton
          showLastButton
          size='large'
          style={{ marginBottom: '50px', marginTop: '50px' }}
        />
      </Stack>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
            Failed to fetch items!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}

export default ExplorePage;
