import React, { useState } from 'react';
import FavoriteItem from './FavoriteItem.jsx';

//MUI//
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';

const FavoritesList = () => {
  const [item] = useState(null);

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

  return (
    <div>
      <h2>Favorites List</h2>
    </div>
  );

};

export default FavoritesList;