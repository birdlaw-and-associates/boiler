import React, { useState } from 'react';
import { Typography, AppBar, CssBaseline, Toolbar, Container, Box, IconButton } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import '../styles/style.css';

// Imports //
import Weather from './Weather.jsx';
import FavoritesList from './FavoritesList.jsx';
import Events from './Events.jsx';
import GoogleSignIn from './GoogleSignIn.jsx';
import Search from './Search.jsx';
import RestaurantList from './RestaurantList.jsx';

const App = () => {
  const [item] = useState(null);

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
            sx={{ mr: 5 }}
          />
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
      </AppBar>
      <main>
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
            <Typography variant='h5' color='textPrimary'>
              <GoogleSignIn />
            </Typography>
          </Container>
        </div>
        <div>
          <Container maxWidth="sm">
            <RestaurantList />
          </Container>
        </div>
      </main>
    </>
  );

};

export default App;