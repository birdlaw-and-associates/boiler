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
    console.log('should be the city or undefined', props.location);
    const url = !props.location
      ? '/api/restaurants'
      : `/api/restaurants/${props.location}`;
    return axios.get(url)
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

  useEffect(() => {
    getRestaurants();
  }, [props.location]);

  let array = [];

  if (props.favorites) {
    array = favorites;
  } else {
    array = restaurants;
    if (props.location !== undefined) {
      array = restaurants.filter(elem => elem.city === props.location);
    }
  }

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
            !!array && array.map(store => {
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
