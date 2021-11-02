import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Pagination, Typography, Button } from '@mui/material';

import ExploreProductContainer from '../buttons-and-sections/ExploreProductContainer.js';

import './ExplorePage.css';

function ExplorePage({ match }) {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });
  const tag = match.params.tag;
  const [open, setOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  // determines sorting method
  const [productSort, setProductSort] = useState('');
  // modified version of productList according to productSort
  const [productShow, setProductShow] = useState([]);
  // for pagination, determines the range of products
  const [productStart, setProductStart] = useState(0);

  const [loaded, setLoaded] = useState(false);

  const [page, setPage] = useState(1);
  // total page numbers
  const [pageNum, setPageNum] = useState(1);

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
    console.log(productStart);
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
      setProductShow(data.products);
      setPageNum(Math.ceil(data.products.length / 12));
      setLoaded(true);
    }
  }

  useEffect(() => {
    getItems();
  }, [tag]);

  // need to do pagination

  // todo build rows

  return (
    <div id='ExplorePage'>
      <div id='ExplorePage-tag'>
        <Typography style={{ marginLeft: '30px', marginTop: '10px' }}>
          {tag.toUpperCase()}
        </Typography>
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
                reviews={prod.content.reviews}
                id={prod.id}
              />
            );
          })
        }
      </div>
      <div
        id='ExplorePage-empty-text'
        style={{ display: loaded && productList.length !== 0 ? 'none' : 'block' }}
      >
        <Typography variant='h4'>
          No products to show
        </Typography>
      </div>
      <Stack spacing={2} style={{ display: loaded && pageNum !== 0 ? 'block' : 'none' }}>
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
