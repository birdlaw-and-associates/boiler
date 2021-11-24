import React, { useState } from 'react';
import { Typography, AppBar, CssBaseline, Toolbar, Container, Box, IconButton } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';
import '../styles/style.css';

// Imports //
import Weather from './Weather.jsx';
import FavoritesList from './FavoritesList.jsx';
<<<<<<< HEAD
import RestaurantList from './RestaurantList.jsx';
=======
// import Search from './Search.jsx';
>>>>>>> 5015b98b94f93ece6bc7cbf7ded94242248a8d8e
/////////////

const App = () => {
  const [item] = useState(null);



  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
<<<<<<< HEAD
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 5 }}
          />
          <MenuIcon />

          <Typography variant='h4' align='center'>
            Boiler!
=======
          <IconButton>
            <MenuIcon />
          </IconButton>
          <Typography variant='h4' align='center'>
              Boiler!
          </Typography>
          <Typography variant='h4' color='textPrimary'>
            <Weather />
>>>>>>> 5015b98b94f93ece6bc7cbf7ded94242248a8d8e
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div>
          <Container maxWidth="sm">
            <Typography variant='h4' color='textPrimary'>
<<<<<<< HEAD
              <Weather />
=======
              Text here, to be replaced.
>>>>>>> 5015b98b94f93ece6bc7cbf7ded94242248a8d8e
            </Typography>
          </Container>
        </div>
        <div>
          <Container maxWidth="sm">
            <Typography variant='h4' color='textPrimary'>
              <FavoritesList />
            </Typography>
          </Container>
<<<<<<< HEAD
        </div>
        <div>
          <RestaurantList />
=======
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
              <Typography variant='h4' color='textPrimary'>
                  {/* <Search /> */}
              </Typography>
            </Container>
>>>>>>> 5015b98b94f93ece6bc7cbf7ded94242248a8d8e
        </div>
      </main>
    </div>
  );

};

export default App;