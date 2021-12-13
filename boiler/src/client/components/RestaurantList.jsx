import React, { useState, useEffect } from 'react';
import RestaurantEntry from './RestaurantEntry.jsx';
import { useSharedUser } from './User.jsx';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';


import axios from 'axios';
const key = require('../../../config/keys').yelp.APIkey;

const RestaurantList = (props) => {

  const { currentUser } = useSharedUser();
  const [favorites, setFavorites] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const getRestaurants = () => {
    return axios.get('/api/restaurants')
      .then(({data}) => {
        setRestaurants(data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const getFavorites = () => {
    axios.get('/api/favorites/' + currentUser.email)
      .then(({data}) => setFavorites(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getRestaurants();
    getFavorites();
  }, []);

  const array = props.favorites ? favorites : restaurants;
  return (
    <div>
      {
        props.favorites
          ? <h2>Your favorite restaurants</h2>
          : <h2>Restaurants in the Area</h2>
      }
      <div className="restaurant-list">
        <Grid
          container
          spacing={4}
          justify="center"
        >
          {
            !!restaurants && array.map(store => {
              return (
                <Grid item xs={12} sm={6} md={4} zeroMinWidth={0}>
                  <RestaurantEntry restaurant={store} key={store.id} isFavorite={favorites.includes(store)} updateFavs={getFavorites}/>
                </Grid>
              );
            })
          }
        </Grid>
      </div>
    </div>
  );

};

export default RestaurantList;
