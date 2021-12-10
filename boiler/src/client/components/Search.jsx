import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Store from './Store.jsx';
import Grid from '@mui/material/Grid';
import RestaurantEntry from './RestaurantEntry.jsx';
const key = require('../../../config/keys').yelp.APIkey;

//search restaurants

const Search = () => {

  // const [ store, useStore ] = useState([]);
  
  const [restaurants, setRestaurants] = useState([]);
  
  
  const getRestaurants = () => {
    axios.get('/api/restaurants')
    .then((results) => {
      console.log('results', results.data);
      setRestaurants(results.data);
    })
    .catch(err => {
      console.error(err);
    });
  };
  
  const getCrawfish = (location) => {
    console.log('this is the location', location);
    return axios.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${location}&categories=crawfish`, {
      headers: {
        Authorization: `Bearer ${key}`,
        Origin: '',
        'X-Requested-With': ''
      }
    })
    .then((response) => response.data.businesses)
    .then((businesses) => {
      setRestaurants(businesses);
      businesses.forEach((store) => {
        axios.post('/api/restaurants', {title: store.name, price: store.price, address: store.location.address1, lat: store.coordinates.latitude, long: store.coordinates.longitude, imageUrl: store.image_url})
        // .then((res) => { console.log('Saved Restaurant' ) })
        // .catch((err) => { console.log('Unable to save restaurant'); });
      });
    })
    .then(getRestaurants())
    .catch(err => console.error('error in yelp api call: ', err));
  };
  
  const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    
    const handleChange = (event) => {
      setValue(event.target.value);
    }
    
    return {
      value,
      onChange: handleChange
    }
  }
  const search = useInput('');


  // useEffect(() => {
  //   useStore
  // })


  return (
    <div>
      <form action="">
      <input type="text" placeholder='enter city' onChange={search.onChange} value={search.value}></input>
      </form>
      <button onClick={() => getCrawfish(search.value)}>where yat?</button>
      <p>{'Restaurants Near You: '}</p>
      <div className="restaurant-list">
        <Grid
          container
          spacing={4}
          justify="center"
        >
          {
            !!restaurants && restaurants.map(store => {
              return (
                <Grid item xs={12} sm={6} md={4} zeroMinWidth={0}>
                  <RestaurantEntry restaurant={store} key={store.id}/>
                </Grid>
              );
            })
          }
        </Grid>
      </div>
    </div>
  );
};

export default Search;