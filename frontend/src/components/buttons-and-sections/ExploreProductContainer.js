import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@material-ui/core';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';

import './ExploreProductContainer.css';

function ExploreProductContainer({ image, name, price, reviews, id }) {
	const reviewsNum = reviews.length;
	var avgRating = 0;
	var ratings = '';

	// Calculate average rating
	for (var i = 0; i < reviewsNum; i++) {
		avgRating += reviews[i].star_rating;
	}

	if (avgRating !== 0 && reviewsNum !== 0) {
		avgRating /= reviewsNum;
		avgRating = Math.round(avgRating * 10) / 10;
		ratings = `${avgRating} (${reviewsNum})`;
	}
	else {
		ratings = `0.0 (${reviewsNum})`;
	}

	// should add onclick function for add cart button

  return (
		<div className='ExploreProductContainer'>
			<div className='ExploreProductContainer-image-wrapper'>
				<Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
					<div className='ExploreProductContainer-image-section'>
						<img
							className='ExploreProductContainer-image'
							src={image}
							alt={name}
						/>
					</div>
					<div className='ExploreProductContainer-image-hovertext'>
						<Typography style={{ color: '#FFFFFF' }} variant='button'>
							Click to view product
						</Typography>
					</div>	
				</Link>
			</div>
			<div className='ExploreProductContainer-name'>
				<Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
					<Typography variant='body2' style={{ color: '#000000' }}>{name}</Typography>
				</Link>
			</div>
			<div className='ExploreProductContainer-bottom'>
				<div className='ExploreProductContainer-rating'>
					<Rating
						name='customized-1'
						defaultValue={1}
						max={1}
						readOnly
					/>
					<Typography variant='subtitle2' style={{ paddingRight: '3px' }}>{ratings}</Typography>
				</div>
				<Typography variant='body1'>${price}</Typography>
				<Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
					<Button
						style={{
							backgroundColor: '#000000',
							color: '#FFFFFF',
							borderRadius: '10px',
							width: '250px',
							marginTop: '20px',
						}}
						variant='contained'
					>
						VIEW PRODUCT
					</Button>
				</Link>
			</div>
		</div>
  );
}

export default ExploreProductContainer;
