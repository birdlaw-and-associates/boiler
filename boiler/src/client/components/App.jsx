
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';



/*
boiler imports
*/

import Weather from './Weather.jsx';
import { BrowserRouter, Routes, Route, Link, useRouteMatch } from 'react-router-dom';
import Search from './Search.jsx';
import GoogleSignIn from './GoogleSignIn.jsx';
import { useSharedUser } from './User.jsx';
import Profile from './Profile.jsx';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  
  const { currentUser, changeCurrentUser } = useSharedUser();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h3" noWrap component="div">
              Boiler!
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          {/* <List>
            {['Search', 'Weather', 'Login'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
          <List>
            <ListItem button key={'Search'}>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <Link to={'/search'} className="nav-item nav-link">Search</Link>
            </ListItem>
            <ListItem button key={'Weather'}>
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <Link to={'/weather'} className="nav-item nav-link">Weather</Link>
            </ListItem>
            <ListItem button key={'Favorites'}>
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <Link to={'/profile'} className="nav-item nav-link">Your Profile</Link>
            </ListItem>
            <ListItem button key={'Login'}>
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <GoogleSignIn />
            </ListItem>
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <Typography paragraph>
            Boiler is an app that brings people together. People of all walks of life all coming together for that special
            gathering: the sharing of many boiled-live shellfish and spices that is the crawfish boil. Find a restaurant that
            serves this tasty southern treat and gather some friends and family to go and enjoy a nice time outside, weather
            permitting (use our handy weather feature to see how the next week will be in your area).
          </Typography>
          {/* <Routes>
            <Route path={'/weather'} element={<Weather />}/>
            <Route path={'/search'} element={<Search />}/>
          </Routes> */}
        </Main>
      </Box>
      <Routes>
        <Route exact path="/" element={< GoogleSignIn/>}/>
        <Route path={'/weather'} element={<Weather />}/>
        <Route path={'/search'} element={<Search />}/>
        <Route path={'/profile'} element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}







// import React, { useState, useContext, useEffect } from 'react';
// import { Route, BrowserRouter } from 'react-router-dom';
// import { Typography, AppBar, CssBaseline, Toolbar, Container, Box, IconButton, colors, Button } from '@material-ui/core';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import MenuIcon from '@mui/icons-material/Menu';
// import '../styles/style.css';

// // Imports //
// import Login from './Login.jsx';
// import Weather from './Weather.jsx';
// // import FavoritesList from './FavoritesList.jsx';
// import Events from './Events.jsx';
// import GoogleSignIn from './GoogleSignIn.jsx';
// import Search from './Search.jsx';
// import RestaurantList from './RestaurantList.jsx';
// import user from './GoogleSignIn.jsx';
// import NavBar from './NavBar.jsx';

// import axios from 'axios';


// //Context
// import { useSharedUser } from './User.jsx';


// const App = () => {

  // const { currentUser, changeCurrentUser } = useSharedUser();

//   const themeLight = createTheme({
//     palette: {
//       primary: {
//         // light: will be calculated from palette.primary.main,
//         main: '#ff4400',
//         // dark: will be calculated from palette.primary.main,
//         // contrastText: will be calculated to contrast with palette.primary.main
//       },
//       secondary: {
//         light: '#0066ff',
//         main: '#0044ff',
//         // dark: will be calculated from palette.secondary.main,
//         contrastText: '#ffcc00',
//       },
//       // Used by `getContrastText()` to maximize the contrast between
//       // the background and the text.
//       contrastThreshold: 3,
//       // Used by the functions below to shift a color's luminance by approximately
//       // two indexes within its tonal palette.
//       // E.g., shift from Red 500 to Red 300 or Red 700.
//       tonalOffset: 0.2,
//       typography: {
//         // Use the system font over Roboto.
//         fontFamily: 'Avenir Next, Roboto,"Helvetica Neue",Arial,sans-serif',
//         htmlFontSize: 16,
//       },
//     },
//   });

//   const themeDark = createTheme({
//     palette: {
//       primary: {
//         main: colors.green[500],
//       },
//       secondary: {
//         main: colors.purple[500],
//       },
//     }
//   });

//   const [light, setLight] = React.useState(true);

//   //Check if user exists in DB
//   //If yes, get their restaurants
//   //If not, create db entry for them

//   return (
//     <div>
//       <ThemeProvider theme={light ? themeLight : themeDark}>
//         <CssBaseline enableColorTheme />

//         <AppBar position="sticky" color="primary">
//           <Toolbar>
//             <IconButton
//               size='small'
//               edge='start'
//               color='primary'
//               aria-label='menu'
//               sx={{ mr: 5 }}/>
//             <Typography variant='h4' align='center'>
//                       Boiler!
//             </Typography>
//             <Typography variant='h4' color='textPrimary'>
//             </Typography>
//             {/* <GoogleSignIn /> */}
//           </Toolbar>
//         </AppBar>
//         <AppBar position="relative" color="secondary">
//           <BrowserRouter>
//             <NavBar/>
//           </BrowserRouter>
//           <Button
//             style={{float: 'left', position: 'sticky'}}
//             onClick={() => {
//               console.log(light);
//               return setLight((prev) => !prev);
//             }}
//           >
//             Toggle Theme
//           </Button>
//         </AppBar>
//       </ThemeProvider>
//     </div>
//   );

// };

// export default App;

// import React, { useState, useContext, useEffect } from 'react';
// import { Route, BrowserRouter } from 'react-router-dom';
// import { Typography, AppBar, CssBaseline, Toolbar, Container, Box, IconButton } from '@material-ui/core';
// import MenuIcon from '@mui/icons-material/Menu';
// import '../styles/style.css';

// // Imports //
// import Login from './Login.jsx';
// import Weather from './Weather.jsx';
// // import FavoritesList from './FavoritesList.jsx';
// import Events from './Events.jsx';
// import GoogleSignIn from './GoogleSignIn.jsx';
// import Search from './Search.jsx';
// import RestaurantList from './RestaurantList.jsx';
// import user from './GoogleSignIn.jsx';
// import NavBar from './NavBar.jsx';


// import axios from 'axios';


// //Context
// import { useSharedUser } from './User.jsx';


// const App = () => {

//   const { currentUser, changeCurrentUser } = useSharedUser();
//   console.log('currentUser from app', currentUser);

//   //Check if user exists in DB
//   //If yes, get their restaurants
//   //If not, create db entry for them

//   return (
//     <div>
//       <CssBaseline />

//       <AppBar position="sticky">
//         <Toolbar>
//           <IconButton
//             size='small'
//             edge='start'
//             color='inherit'
//             aria-label='menu'
//             sx={{ mr: 5 }}/>
//           <Typography variant='h4' align='center'>
//                     Boiler!
//           </Typography>
//           <Typography variant='h4' color='textPrimary'>
//           </Typography>
//           {/* <GoogleSignIn /> */}
//         </Toolbar>
//       </AppBar>
//       <BrowserRouter>
//         <NavBar/>
//       </BrowserRouter>
//     </div>
//   );

// };

// export default App;