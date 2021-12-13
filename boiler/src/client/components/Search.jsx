import React, { useState, useEffect } from 'react';
import { Button, Box, TextField } from '@mui/material';
import axios from 'axios';
import Store from './Store.jsx';
import Grid from '@mui/material/Grid';
const key = require('../../../config/keys').yelp.APIkey;
import RestaurantList from './RestaurantList.jsx';

//search restaurants

const Search = () => {
  const [ beenSearched, changeSearched] = useState(false);
  const [ citySearched, changeCity ] = useState(undefined);
  // const [ store, useStore ] = useState([]);
  
  
  const getCrawfish = (location) => {
    let area = '';
    return axios.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${location}&categories=seafood`, {
      headers: {
        Authorization: `Bearer ${key}`,
        Origin: '',
        'X-Requested-With': ''
      }
    })
      .then((response) => response.data.businesses)
      .then((businesses) => {
        // setRestaurants(businesses);
        businesses.forEach((store) => {
          axios.post('/api/restaurants', {title: store.name, price: store.price, address: store.location.address1, lat: store.coordinates.latitude, long: store.coordinates.longitude, imageUrl: store.image_url, city: store.location.city, yelpRating: store.rating})
            .then((res) => { console.log('Saved Restaurant' ); })
            .catch((err) => { console.log('Unable to save restaurant'); });
          area = store.location.city;
        });
      })
      .catch(err => console.error('error in yelp api call: ', err))
      .finally(() => {
        changeCity(area);
        changeSearched(true);
      });
  };
  
  const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    
    const handleChange = (event) => {
      setValue(event.target.value);
    };
    
    return {
      value,
      onChange: handleChange
    };
  };
  const search = useInput('');


  // useEffect(() => {
  //   useStore
  // })


  return (
    <div>
      <Box
        display="flex" 
        alignItems="center"
        justifyContent="center"
      >
        <form action="">
          <TextField id="outlined-basic" label="enter city" variant="outlined"onChange={search.onChange} value={search.value} > </TextField>
        </form>
      </Box>
      <Box
        display="flex" 
        alignItems="center"
        justifyContent="center"
      >
        <Button onClick={() => getCrawfish(search.value)}>where yat?</Button>
      </Box>
      {beenSearched && <RestaurantList favorites={false} location={citySearched} />}
    </div>
  );
};

export default Search;