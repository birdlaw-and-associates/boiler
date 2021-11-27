import React, { useState, useContext, useEffect } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Typography, AppBar, CssBaseline, Toolbar, Container, Box, IconButton } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import '../styles/style.css';

// Imports //
import Login from './Login.jsx';
import Weather from './Weather.jsx';
import FavoritesList from './FavoritesList.jsx';
import Events from './Events.jsx';
import GoogleSignIn from './GoogleSignIn.jsx';
import Search from './Search.jsx';
// import RestaurantList from './RestaurantList.jsx';
import user from './GoogleSignIn.jsx';

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
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size='small'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 5 }} />
          <MenuIcon />

          <Typography variant='h4' align='center'>
                    Boiler!
          </Typography>
          <IconButton>
            <MenuIcon />
          </IconButton>
          <Typography variant='h4' align='center'>
                    Boiler!
          </Typography>
          <Typography variant='h4' color='textPrimary'>
            <Weather />
          </Typography>
        </Toolbar>
      </AppBar><main>
        <div>
          <Container maxWidth="sm">
            <Typography variant='h4' color='textPrimary'>
              <Weather />
                        Text here, to be replaced.
            </Typography>
          </Container>
        </div>
        <div>
          <Container maxWidth="sm">
            <Typography variant='h4' color='textPrimary'>
              <FavoritesList />
            </Typography>
          </Container>
        </div>

        <div>
          <Container maxWidth="sm">
            <Typography variant='h4' color='textPrimary'>
              {/* <Search /> */}
            </Typography>
          </Container>
        </div>
        <div>
          <Container maxWidth="sm">
            {/* <RestaurantList /> */}
          </Container>
        </div>
        <div>
          <Container maxWidth="sm">
            <Typography variant='h5' color='textPrimary'>
              <GoogleSignIn />
            </Typography>
          </Container>
        </div>
      </main>
    </>
  );

};

export default App;