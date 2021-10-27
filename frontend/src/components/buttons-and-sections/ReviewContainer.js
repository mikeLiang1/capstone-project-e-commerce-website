import React from 'react';

import { Card, Button } from '@material-ui/core';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import './ReviewContainer.css';

function ReviewContainer({
    first_name,
    last_name,
    star_rating,
    title,
    content,
    likes,
    image,
    date_posted,
    is_original_poster,
    is_liked,
    rev_id,
    func,
  }) {
    return (
      <div className='ReviewContainer'>
        <Card
          className='ReviewContainer-card'
          elevation={3}
        >
          <div className='ReviewContainer-information'>
            <p>{first_name} {last_name}</p>
            <div className='ReviewContainer-likes'>
              <IconButton>
                <ThumbUpIcon className='Like-button-liked' onClick={() => func(rev_id, 'like')} color='primary' style={{ display: is_liked ? 'block' : 'none'}}/>
                <ThumbUpIcon className='Like-button-unliked' onClick={() => func(rev_id, 'like')} color='action' style={{ display: is_liked ? 'none' : 'block'}}/>
              </IconButton>
              {likes}
            </div>
          </div>
          <div className='ReviewContainer-content'>
            <div className='ReviewContainer-date-star'>
              <Rating name="star_rating" value={star_rating} readOnly />
              <p style={{ marginLeft: '20px' }}>{date_posted}</p>
            </div>
            <p style={{ fontSize: '16px', fontWeight: '700' }}>{title}</p>
            <p>{content}</p>
          </div>
          <div className='ReviewContainer-image'>
            <img
              className='Attached-image'
              src={image}
              alt='Item Image'
            ></img>
          </div>
          <div className='ReviewContainer-date'>
            <Button variant='outlined' onClick={() => func(rev_id, 'edit')} style={{ visibility: is_original_poster ? 'visible' : 'hidden' }}>Edit</Button>
            <Button variant='contained' onClick={() => func(rev_id, 'delete')} style={{ visibility: is_original_poster ? 'visible' : 'hidden', backgroundColor: 'black', color: 'white' }}>Delete</Button>
          </div>
        </Card>
      </div>
    );
  }
  
  export default ReviewContainer;
  