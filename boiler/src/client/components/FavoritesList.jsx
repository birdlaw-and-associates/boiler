import React, { useEffect, useState, createContext } from 'react';
import FavoriteItem from './FavoriteItem.jsx';
import axios from 'axios';

//MUI//

// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import { Tooltip } from '@material-ui/core';
import { CardActions, IconButton } from '@mui/material';

// export const FavoriteContext = createContext(); //Will likely need an import context from the RestaurantsList too

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]); //this can get used from RestaurantsList with 'use-between'
  const [currentUser, setCurrentUser] = useState();
  //This will require the backend for user favorites to be done.
  /*
  Upon addToFavorites click
  if (!filled heart) {
    change icon state from FavoriteBorderIcon --> FavoriteIcon (empty heart outline to filled heart)
    axios update/patch request
      update 'this' user (this is where the join table comes in, ask Ben about what request needs to be made to where)
      .then() getUserFavorites (singular for the one user) (??)
      .then() getAllUserFavorites (so that the total number of favorites from all restaurants is updated without need to refresh)
  } else {
    axios update/patch request to remove join for that user from that restaurant
      .then() getUserFavorites (singular for the one user) (??)
      .then() getAllUserFavorites (so that the total number of favorites from all restaurants is updated without need to refresh)
  }
  */

  //TODO: Figure out how to use 'use-between' to share state between this component and the RestaurantsList component
  //Get all current user favorites on load
  // useEffect(() => {
  //   axios.get(`/api/favorites/${currentUser.id}`, (req, res))
  //     .then(res => res.json())
  //     .then(res => setFavorites(res.FavoriteRestaurants.map(place => {
  //       return {
  //         address: '',
  //         price: '',
  //         yelpRating: '',
  //         imageUrl: '',
  //         favStatus: ''
  //       };
  //     })))
  //     .catch((err) => { console.log('Could not retrieve weather data', err); });
  // }, []);


  //Remove Favorite update request
  //Specifically to remove from the FavoritesList, handled from the FavoritesList
  // const removeFromFavoritesList = (e) => {
  //   axios.delete(`/api/favorites/${currentUser.id}`, {title: title})
  //     .then(() => {
  //       setFavorites(favorites.slice(favorites.indexOf(e.target.name, 1)));
  //       //call getFavorites here to update the view in both the FavoritesList and the RestaurantList
  //       console.log('Successfully removed from FavoritesList');
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       console.log('Failed to remove from FavoritesList');
  //     });
  // };



  //Set default card stock look in FavoritesList


  //Map function in here to lay out all the cards in the 'favorites' array in the state
  //Attributes in CardHeader, CardMedia, and Typography will be elements passed in from the useEffect
  //Also needs to refresh the whole list when one is removed, that skeleton prop will be nice for this
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardHeader
        title="Some basic title"
        subheader="November 24th, 2021" />
      <CardMedia
        component="img"
        height="194"
        image=""
        alt=""
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This is just some text in the typography field to fill in the space while we figure out whats next.
        </Typography>
        <Typography>Price:</Typography>
        <Typography>Yelp Rating:</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Remove from Favorites" placement ="right-start" arrow>
          <IconButton>
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );

};

export default FavoritesList;