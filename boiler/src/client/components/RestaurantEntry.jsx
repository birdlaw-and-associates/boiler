import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Box, CardHeader, CardMedia, CardContent, Typography, IconButton} from '@mui/material';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Card from '@mui/material/Card';
import { CardActions } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';

import { useSharedUser } from './User.jsx';


const RestaurantEntry = (props) => {
  let initialIcon = BookmarkAddOutlinedIcon;
  if (props.favorite) {
    initialIcon = BookmarkAddedOutlinedIcon;
  }
  const [bookmarkIcon, setBookmarkIcon] = useState(initialIcon);
  const { currentUser } = useSharedUser();
  const {yelpRating, title, address, price, imageUrl, id} = props.restaurant;

  const toggleFavorites = () => {
    if (props.favorite) {
      axios.delete('/api/favorites/', {title: title, userEmail: currentUser.email})
        .then(() => {
          console.log('successfully removed from favorites');
          setBookmarkIcon(BookmarkAddOutlinedIcon);
        })
        .catch(err => {
          console.error(err);
          console.log('failed to add favorite');
        });
    } else {
      axios.post('/api/favorites/', {restaurantId: id, email: currentUser.email })
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
    props.updateFavs();
  };

  const updateBookmarkIcon = () => {
    if (props.favorite) {
      initialIcon = BookmarkAddedOutlinedIcon;
    } else {
      initialIcon = BookmarkAddOutlinedIcon;
    }
  };

  useEffect(() => {
    updateBookmarkIcon();
  });


  return (

    <Card sx={{ maxWidth: 600 }}>
      <CardHeader
        title={title}
      />
      <CardMedia
        component="img"
        height="194"
        image={imageUrl}
        alt=""
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This is just some text in the typography field to fill in the space while we figure out whats next.
        </Typography>
        <Typography>Address: {address}</Typography>
        <Typography>Price: {price}</Typography>
        <Typography>Yelp Rating: {yelpRating}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Toggle Favorites" placement ="right-start" arrow onClick={handleClick}>
          {
            props.isFavorite
              ? (
                <IconButton label='Toggle Favorites'>
                  <BookmarkAddedOutlinedIcon />
                </IconButton>
              )
              :
              (<IconButton label='Toggle Favorites'>
                <BookmarkAddOutlinedIcon />
              </IconButton>
              )
          }
        </Tooltip>
      </CardActions>
    </Card>
  );

};

export default RestaurantEntry;
