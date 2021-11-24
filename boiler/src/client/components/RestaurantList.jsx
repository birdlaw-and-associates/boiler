import React, { useState, useEffect } from 'react';
import RestaurantEntry from './RestaurantEntry.jsx';
import axios from 'axios';

const RestaurantList = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const getRestaurants = () => {
    axios.get('/api/restaurants')
      .then(results => setRestaurants(results))
      .catch(err => {
        console.error(err);
      });
  };

  const getFavorites = () => {
    axios.get('/api/favorites' + currentUser.id)
      .then(results => setFavorites(results))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getRestaurants();
    getFavorites();
  });

  return (
    <div>
      <h2>Restaurants in the Area</h2>
      <div className="restaurant-list">
        {
          restaurants.map(store => {
            return (
              <RestaurantEntry restaurant={store} key={store.id} favorite={favorites.includes(store)}/>
            );
          })
        }
      </div>
    </div>
  );

};

export default RestaurantList;