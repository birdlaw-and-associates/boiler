
   
import React, { useState, useContext, useEffect } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Typography, AppBar, CssBaseline, Toolbar, Container, Box, IconButton } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import '../styles/style.css';

// Imports //
import Login from './Login.jsx';
import Weather from './Weather.jsx';
// import FavoritesList from './FavoritesList.jsx';
import Events from './Events.jsx';
import GoogleSignIn from './GoogleSignIn.jsx';
import Search from './Search.jsx';
import RestaurantList from './RestaurantList.jsx';
import user from './GoogleSignIn.jsx';
import NavBar from './NavBar.jsx';

import axios from 'axios';


//Context
import { useSharedUser } from './User.jsx';


const App = () => {

  const { currentUser, changeCurrentUser } = useSharedUser();
  console.log('currentUser from app', currentUser);

  //Check if user exists in DB
  //If yes, get their restaurants
  //If not, create db entry for them

  return (
    <div>
      <CssBaseline />

      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size='small'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 5 }}/>
          <Typography variant='h4' align='center'>
                    Boiler!
          </Typography>
          <Typography variant='h4' color='textPrimary'>
          </Typography>
          {/* <GoogleSignIn /> */}
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <NavBar/>
      </BrowserRouter>
    </div>
  );

};

export default App;