import React, { useState } from 'react';
import axios from 'axios';
import {Button, Box, CardHeader, CardMedia, CardContent, Typography, IconButton} from '@mui/material';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';

const RestaurantEntry = (props) => {
  // let initialIcon = BookmarkAddOutlinedIcon;
  // if (props.favorite) {
  //   initialIcon = BookmarkAddedOutlinedIcon;
  // }
  // const [bookmarkIcon, setBookmarkIcon] = useState(initialIcon);

  const {yelpRating, title, address, price, imageUrl, id} = props.restaurant;

  // const updateRating = (e) => {
  //   e.preventDefault();
  //   axios.put(`/api/restaurants/${id}`, {userRating: e.currentTarget.value})
  //     .then(console.log('voted!'))
  //     .catch(err => {
  //       console.error(err);
  //       console.log('vote didn\'t count');
  //     });
  // };

  const toggleFavorites = () => {
    if (props.favorite) {
      axios.delete(`/api/favorites/${currentUser.id}`, {title: title})
        .then(() => {
          console.log('successfully removed from favorites');
          setBookmarkIcon(BookmarkAddOutlinedIcon);
        })
        .catch(err => {
          console.error(err);
          console.log('failed to add favorite');
        });
    } else {
      axios.put(`/api/favorites/${currentUser.id}`, {id: id })
        .then(() => {
          console.log('successfully added to favorites');
          setBookmarkIcon(BookmarkAddedOutlinedIcon);
        })
        .catch(err => {
          console.error(err);
          console.log('failed to add favorite');
        });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    toggleFavorites();
  };


  return (

    <Card variant='outlined' className='restaurant-card'>
      <CardHeader
        title={title}
      />
      <CardMedia
        component='img'
        height='194'
        image={imageUrl}
        alt="image of restaurant"
      />
      <CardContent>
        <Typography variant='body2'>
          {address}
          $ {price}
          {yelpRating}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton label='Toggle Favorites'>
          {
            props.favorite
              ? <BookmarkAddedOutlinedIcon />
              : <BookmarkAddOutlinedIcon />
          }
        </IconButton>
      </CardActions>
    </Card>
  );

};

export default RestaurantEntry;