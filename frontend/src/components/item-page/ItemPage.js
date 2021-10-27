import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import BasicSelect from '../buttons-and-sections/BasicSelect.js';
import TextField from '@mui/material/TextField';
import Modal from 'react-modal';
import { Typography } from '@material-ui/core';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Cookies from 'js-cookie';

import { initializeApp } from 'firebase/app';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';

import ReviewContainer from '../buttons-and-sections/ReviewContainer.js';
import Accordian from '../buttons-and-sections/Accordian.js';
import ReviewAccordian from '../buttons-and-sections/ReviewAccordian.js';
import './ItemPage.css';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAVOqrvODx6KS-xBGs5guJTrKBJjduEjRI',
  authDomain: 'nocta-tech.firebaseapp.com',
  projectId: 'nocta-tech',
  storageBucket: 'nocta-tech.appspot.com',
  messagingSenderId: '1002605988200',
  appId: '1:1002605988200:web:e91efebc3765fd58b0eedd',
  measurementId: 'G-5HBFEX2BNM',
};

const firebaseApp = initializeApp(firebaseConfig);
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);

function ItemPage({ match }) {
  // pass in item id
  const productId = 'B0Si9HGHqL0IQ7EzItpK';
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [tag, setTag] = useState('');
  const [reviews, setReviews] = useState([]);
  const [reviewsSort, setReviewsSort] = useState('default');
  const [reviewsShow, setReviewsShow] = useState([]);
  const [reviewsLen, setReviewsLen] = useState(10);
  const [units, setUnits] = useState(0);
  const [reviewIds, setReviewIds] = useState(0);
  const reviewNewImgInitialState =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  const [reviewNewImg, setReviewNewImg] = useState(reviewNewImgInitialState);
  const reviewInitialState = {
    product_id: match.params.itemId,
    user_id: '',
    first_name: '',
    last_name: '',
    star_rating: 0,
    title: '',
    content: '',
    likes: [],
    image: '',
    date_posted: '',
    review_id: 0,
  };
  const [review, setReview] = useState(reviewInitialState);
  const [user, setUser] = useState({
    id: '',
    content: {
      first: '',
      last: '',
      address: '',
    },
  });
  const [modalOpen, setModalOpen] = useState(false);
  const list = ['1', '2', '3', '4', '5'];
  const [quantity, setQuantity] = useState('');
  const [ratings, setRatings] = useState('');
  const [accordianName, setAccordianName] = useState('');
  const [onEdit, setOnEdit] = useState(false);
  const fileInput = React.useRef(null);

  // Get item data
  async function getItemData() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const requestOptionsPost = {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await fetch(`/product/${match.params.itemId}`, requestOptions);
    const res2 = await fetch(
      `/product_visited/${match.params.itemId}`,
      requestOptionsPost
    );
    if (res.status === 400) {
      alert('Product not found!');
    } else if (res.status === 200) {
      const data = await res.json();
      setCategory(data.data.category);
      setDesc(data.data.description);
      setImg(data.data.image);
      setName(data.data.name);
      setPrice(data.data.price);
      setTag(data.data.tag);
      setReviews(data.data.reviews);
      setReviewsShow(data.data.reviews.slice(-10).reverse());
      setUnits(data.data.units_sold);
      setReviewIds(data.data.review_ids);
      setAccordianName(`Reviews (${data.data.reviews.length})`);

      // Calculate avg star ratings
      var avg = 0;
      for (var i = 0; i < data.data.reviews.length; i++) {
        avg += data.data.reviews[i].star_rating;
      }
      if (avg !== 0 && data.data.reviews.length !== 0) {
        avg /= data.data.reviews.length;
        var rounded = Math.round(avg * 10) / 10;
        setRatings(`${rounded} (${data.data.reviews.length})`);
      } else {
        setRatings(`0.0 (${data.data.reviews.length})`);
      }
    }
  }

  // Get logged-in user's info
  async function getUserData() {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    if (Cookies.get('user') !== '') {
      fetch(`/auth/user/${Cookies.get('user')}`, requestOptions).then(
        async (response) => {
          try {
            const data = await response.json();
            setUser(data);
            console.log('response data', data);
            console.log(user);
          } catch (error) {
            console.log('Error happened');
            console.error(error);
          }
        }
      );
    }
  }

  // Post new review
  async function postReview() {
    // Check all inputs present
    var errmsg = '';
    if (review.star_rating === 0) errmsg += 'star ratings, ';
    if (review.title === '') errmsg += 'title, ';
    if (review.content === '') errmsg += 'content';
    errmsg = errmsg.replace(/, $/, '');
    console.log(errmsg);

    if (errmsg !== '') {
      alert(`Please complete the following fields: ${errmsg}`);
      return;
    }

    // Uploading image to retrieve link
    if (reviewNewImg instanceof Blob) {
      //const storageRef = ref(storage, reviewNewImg.name);
      const storageRef = ref(storage, `Review_images/${reviewNewImg.name}`);
      let snapshot = await uploadBytes(storageRef, reviewNewImg);
      let url = await getDownloadURL(
        ref(storage, `Review_images/${reviewNewImg.name}`)
      );
      review.image = url;
    }

    var newBody;

    if (onEdit === false) {
      var today = new Date();
      today.setHours(today.getHours() + 9);
      const newDate = today.toISOString().replace('T', ' ').substring(0, 19);
      setReview({ ...review, date_posted: newDate });
      const newReviewIds = reviewIds + 1;

      newBody = {
        product_id: match.params.itemId,
        name: name,
        category: category,
        image: img,
        price: price,
        reviews: reviews,
        description: desc,
        tag: tag,
        units_sold: units,
        review_ids: newReviewIds,
        review: {
          product_id: match.params.itemId,
          user_id: user.id,
          review_id: reviewIds,
          first_name: user.content.first,
          last_name: user.content.last,
          star_rating: review.star_rating,
          title: review.title,
          content: review.content,
          likes: review.likes,
          image: review.image,
          date_posted: newDate,
        },
      };

      setReviewIds(reviewIds + 1);
    } else {
      // edit reviews array
      const idx = reviews.map((o) => o.user_id).indexOf(user.id);
      var newArr = reviews;
      newArr[idx] = review;

      // If image removed
      if (reviewNewImg === null) newArr[idx].image = '';

      newBody = {
        product_id: match.params.itemId,
        name: name,
        category: category,
        image: img,
        price: price,
        reviews: newArr,
        description: desc,
        tag: tag,
        units_sold: units,
        review_ids: reviewIds,
      };
    }

    const requestOptionsPut = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(newBody),
    };

    fetch(`/product`, requestOptionsPut).then(async (response) => {
      try {
        const data = await response.json();
        if (onEdit) {
          alert('Review successfully editted!');
        } else {
          alert('Review successfully posted!');
        }
        console.log('response data', data);
        setModalOpen(false);
        setOnEdit(false);
        setReviewNewImg(reviewNewImgInitialState);
        setReview(reviewInitialState);
        window.location.reload();
      } catch (error) {
        alert('Review could not be posted', error);
        console.log('Error happened');
        console.error(error);
      }
    });
  }

  // Update/Delete existing reviews
  async function updateReviews(review_id, command) {
    if (Cookies.get('user') === '') {
      alert('Only logged in users can do this task!');
      return;
    }

    // Find review with given review_id
    var newArr = reviews;

    for (var i = 0; i < reviews.length; i++) {
      if (reviews[i].review_id === review_id) {
        // For delete and edit, make sure to check current user is the writer of the review
        if (command === 'delete') {
          if (reviews[i].user_id !== user.id) {
            alert('You are not an original writer of this review!');
            return;
          }
          newArr.splice(i, 1);
          alert('Successfully deleted the review!');
          window.location.reload();
        }

        // For edit, simply open modal and return from the function
        else if (command === 'edit') {
          if (reviews[i].user_id !== user.id) {
            alert('You are not an original writer of this review!');
            return;
          }
          setReview(reviews[i]);
          setReviewNewImg(reviews[i].image);
          setOnEdit(true);
          setModalOpen(true);
          return;
        }

        // For like, remove like if user has liked the review, otherwise like the review
        else if (command === 'like') {
          if (reviews[i].likes.includes(user.id)) {
            const idx = reviews[i].likes.indexOf(user.id);
            newArr[i].likes.splice(idx, 1);
          } else {
            newArr[i].likes.push(user.id);
          }
        }
      }
    }

    // Now update whole product info with new reviews
    const newBody = {
      product_id: match.params.itemId,
      name: name,
      category: category,
      image: img,
      price: price,
      reviews: newArr,
      description: desc,
      tag: tag,
      units_sold: units,
      review_ids: reviewIds,
    };

    const requestOptionsPut = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(newBody),
    };

    fetch(`/product`, requestOptionsPut).then(async (response) => {
      try {
        const data = await response.json();
        console.log('response data', data);
        setReview(reviewInitialState); // should i put it after
      } catch (error) {
        console.log('Error happened');
        console.error(error);
      }
    });
  }

  const handleRemove = (e) => {
    fileInput.current.value = null;
    setReviewNewImg(reviewNewImgInitialState);
  };

  const handleClick = (e) => {
    fileInput.current.click();
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setReviewNewImg(e.target.files[0]);
    }
  };

  const handleReviewButton = (e) => {
    if (Cookies.get('user') === '') {
      alert('Only logged in users can write reviews!');
    } else if (reviews.some((e) => e.user_id === user.id)) {
      alert('You can write only one review for each product!');
    } else {
      setModalOpen(true);
    }
  };

  const handleSortButton = (e) => {
    setReviewsSort('default');
  };

  const handleLoadButton = (e) => {
    if (reviewsLen >= reviews.length) {
      alert('No more reviews to be loaded!');
      return;
    }
    if (reviewsSort === 'default') {
      setReviewsShow(reviews.slice((reviewsLen + 10) * -1).reverse());
    }
    setReviewsLen(reviewsLen + 10);
  };

  // Add Item to the User's Cart
  const addTocart = async () => {
    // const uid = Cookies.get('user');
    // const productId = match.params.itemId;
    // const productQuantity = quantity;
    const addToCartBody = {
      uid: Cookies.get('user'),
      productId: match.params.itemId,
      productQuantity: quantity,
      productImage: img,
      productName: name,
      productPrice: price,
    };
    console.log(addToCartBody);
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
      alert('Failed to add to cart!');
    } else if (response.status === 200) {
      const data = await response.json();
      // TODO: Implement "Succefully Added to Cart" Pop-up
      alert('Added to Cart!');
    }
  };

  useEffect(() => {
    getItemData();
    getUserData();
  }, []);

  return (
    <div id='ItemPage'>
      <div id='product-category'>
        <Typography style={{ marginLeft: '30px', marginTop: '10px' }}>
          {category}
        </Typography>
      </div>
      <div id='ItemPage-flex'>
        <div id='product-wrapper'>
          <img id='product-image' src={img} alt={img} />
          <div id='product-info'>
            <Typography
              variant='h4'
              style={{ fontWeight: '700', marginBottom: '50px' }}
            >
              {name}
            </Typography>
            <div id='product-ratings'>
              <Rating
                name='customized-1'
                defaultValue={1}
                max={1}
                size='large'
                readOnly
              />
              <Typography variant='h6'>{ratings}</Typography>
            </div>
            <Typography
              variant='h4'
              style={{ fontWeight: '600', marginTop: '30px' }}
            >
              ${price}
            </Typography>
            <Typography
              variant='body1'
              style={{ marginTop: '50px', marginBottom: '20px' }}
            >
              Tag: {tag}
            </Typography>
            <div id='product-info-buttons'>
              <BasicSelect
                name='Quantity'
                list={list}
                selected={quantity}
                handleChange={(e) => setQuantity(e.target.value)}
              />
              <Button
                onClick={() => {
                  addTocart();
                }}
                type='submit'
                id='add-cart-button'
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
        <div id='product-description'>
          <Typography variant='h5' style={{ marginBottom: '30px' }}>
            Description
          </Typography>
          <Typography variant='body'>{desc}</Typography>
        </div>
        <div className='ItemPage-flex-vert'>
          <div id='review-section'>
            <ReviewAccordian
              title={accordianName}
              content={reviewsShow.map((rev, id) => (
                <ReviewContainer
                  key={id}
                  first_name={rev.first_name}
                  last_name={rev.last_name}
                  star_rating={rev.star_rating}
                  title={rev.title}
                  content={rev.content}
                  likes={rev.likes.length}
                  image={rev.image}
                  date_posted={rev.date_posted}
                  is_original_poster={rev.user_id === user.id}
                  is_liked={rev.likes.includes(user.id)}
                  rev_id={rev.review_id}
                  func={updateReviews}
                />
              ))}
              writeFunc={handleReviewButton}
              sortFunc={handleSortButton}
              loadFunc={handleLoadButton}
            />
          </div>
          <Modal
            isOpen={modalOpen}
            style={{
              zIndex: 1,
              overlay: { backgroundColor: 'rgba(0,0,0, 0.5)' },
              content: {
                top: '50px',
                left: '250px',
                right: '250px',
                bottom: '50px',
              },
            }}
          >
            <IconButton
              style={{ float: 'right' }}
              onClick={() => {
                setModalOpen(false);
                setOnEdit(false);
                console.log(reviewNewImg);
              }}
            >
              <CloseIcon />
            </IconButton>
            <div id='modal-review'>
              <Typography variant='h5'>My Review for:</Typography>
              <Typography variant='h5'>{name}</Typography>
              <div id='review-space-between'>
                <div id='review-images-section'>
                  <img className='review-image' src={img} alt={img} />
                  <div id='file-upload-section'>
                    <img
                      className='review-image'
                      src={
                        reviewNewImg instanceof Blob
                          ? URL.createObjectURL(reviewNewImg)
                          : reviewNewImg
                      }
                      alt={
                        reviewNewImg instanceof Blob
                          ? reviewNewImg.name
                          : 'media'
                      }
                    />
                  </div>
                  <Typography style={{ fontSize: '12pt' }}>
                    Image uploaded
                  </Typography>
                </div>
                <div id='review-inputs-section'>
                  <div id='review-space-between'>
                    <Typography style={{ fontSize: '11pt', color: '#FF7A00' }}>
                      Overall Rating*
                    </Typography>
                    <Rating
                      value={review.star_rating}
                      onChange={(e, newValue) => {
                        setReview({ ...review, star_rating: newValue });
                      }}
                    />
                    <Typography
                      style={{
                        fontSize: '11pt',
                        color: review.star_rating === 0 ? 'red' : 'black',
                      }}
                    >
                      Click to rate!
                    </Typography>
                  </div>
                  <Divider style={{ zIndex: 2 }} />
                  <br />
                  <Typography className='Itempage-review-text'>
                    Review Title*
                  </Typography>
                  <TextField
                    label='Title'
                    error={review.title === '' ? true : false}
                    multiline
                    maxRows={8}
                    value={review.title}
                    onChange={(e) =>
                      setReview({ ...review, title: e.target.value })
                    }
                    style={{ width: '400px' }}
                  />
                  <br />
                  <Divider style={{ zIndex: 2 }} />
                  <br />
                  <Typography className='Itempage-review-text'>
                    Review*
                  </Typography>
                  <TextField
                    label='Content'
                    error={review.content === '' ? true : false}
                    multiline
                    maxRows={5}
                    value={review.content}
                    onChange={(e) =>
                      setReview({ ...review, content: e.target.value })
                    }
                    minRows={5}
                    style={{ width: '400px' }}
                  />
                  <br />
                  <div id='review-photo-buttons'>
                    <Button
                      variant='outlined'
                      style={{ width: '170px' }}
                      onClick={() => {
                        handleClick();
                      }}
                    >
                      Add photo
                    </Button>
                    <input
                      id='file-upload'
                      ref={fileInput}
                      onChange={handleChange}
                      type='file'
                    />
                    <Button
                      variant='outlined'
                      style={{ width: '170px' }}
                      onClick={() => {
                        handleRemove();
                      }}
                    >
                      Remove photo
                    </Button>
                  </div>
                  <br />
                </div>
              </div>
              <Button
                id='post-review-button'
                size='large'
                onClick={() => postReview()}
                style={{ display: onEdit ? 'none' : 'block' }}
              >
                Post Review
              </Button>
              <Button
                id='post-review-button'
                size='large'
                onClick={() => postReview()}
                style={{ display: onEdit ? 'block' : 'none' }}
              >
                Edit Review
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
