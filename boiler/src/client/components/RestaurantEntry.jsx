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
  if (props.isFavorite) {
    initialIcon = BookmarkAddedOutlinedIcon;
  }
  const [bookmarkIcon, setBookmarkIcon] = useState(initialIcon);
  const { currentUser } = useSharedUser();
  const {yelpRating, title, address, price, imageUrl, id, city} = props.restaurant;

  const toggleFavorites = () => {
    if (props.isFavorite) {
      axios.delete(`/api/favorites/${id}/${currentUser.email}`)
        .then(() => {
          console.log('successfully removed from favorites');
          setBookmarkIcon(BookmarkAddOutlinedIcon);
        })
        .catch(err => {
          console.error(err);
          console.log('failed to remove from favorites');
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

  // const updateBookmarkIcon = () => {
  //   if (props.isFavorite) {
  //     initialIcon = BookmarkAddedOutlinedIcon;
  //   } else {
  //     initialIcon = BookmarkAddOutlinedIcon;
  //   }
  // };

  // useEffect(() => {
  //   updateBookmarkIcon();
  // });


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
        <Typography>Address: {address}, {city}</Typography>
        <Typography>Price: {price}</Typography>
        <Typography>Yelp Rating: {yelpRating}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        {
          props.isFavorite
            ? (
              <Tooltip title="Remove Favorites" placement ="right-start" arrow onClick={handleClick}>
                <IconButton label='Remove Favorites'>
                  <BookmarkAddedOutlinedIcon />
                </IconButton>
              </Tooltip>
            )
            : (
              <Tooltip title="Add to Favorites" placement ="right-start" arrow onClick={handleClick}>
                <IconButton label='Add to Favorites'>
                  <BookmarkAddOutlinedIcon />
                </IconButton>
              </Tooltip>
            )
        }
      </CardActions>
    </Card>
  );

};

export default RestaurantEntry;
