import React from 'react';

import { Card } from '@material-ui/core';
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
  }) {
    return (
      <div className='ReviewContainer'>
        <Card
          className='ReviewContainer-card'
          elevation={3}
          style={{
            maxWidth: '1600px',
            minWidth: '800px',
            minHeight: '300px',
            margin: '32px 0',
            padding: '16px 16px',
          }}
        >
          <div className='ReviewContainer-image'>
            <img
              src={image}
              alt='Item Image'
              style={{ width: '175px' }}
            ></img>
          </div>
          <div className='ReviewContainer-information'>
            <p style={{ fontSize: '16px', fontWeight: '700' }}>{title}</p>
            <Rating name="star_rating" value={star_rating} readOnly />
            <p>{content}</p>
            <p>- {first_name} {last_name}</p>
          </div>
          <div className='ReviewContainer-likes'>
            <IconButton>
              <ThumbUpIcon/>
            </IconButton>
            <div className='ReviewContainer-likes-display'>{likes}</div>
          </div>
          <div className='ReviewContainer-date'>
            {date_posted}
          </div>
        </Card>
      </div>
    );
  }
  
  export default ReviewContainer;
  