import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useRouteMatch } from 'react-router-dom';

import FavoriteItem from './FavoriteItem.jsx';
import FavoritesList from './FavoritesList.jsx';
import Search from './Search.jsx';
import Weather from './Weather.jsx';
import GoogleSignIn from './GoogleSignIn.jsx';
import Events from './Events.jsx';
import Profile from './Profile.jsx';
import { useSharedUser } from './User.jsx';

const NavBar = () => {
  // const { path, url } = useRouteMatch();

  const [ menu, setMenu ] = useState('none');

  const { currentUser, changeCurrentUser } = useSharedUser();
  console.log(currentUser);
  const toggleMenu = () => {
    setMenu(menu === 'none' ? 'block' : 'none');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light trueNav">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{display: menu}}>
          <div className="navbar-nav me-auto">
            <button>
              <Link to={'/search'} className="nav-item nav-link">Search</Link>
            </button>
            <button>
              <Link to={'/weather'} className="nav-item nav-link">Weather</Link>
            </button>
            <button>
              <Link to={'/profile'} className='nav-item nav-link'>Your Profile</Link>
            </button>
            <button>
              <Link to={'/'} className="nav-item nav-link">Sign Out</Link>
            </button>
          </div>
          <div className="navbar-nav">
          </div>
        </div>
      </nav>
      <Routes>
        <Route exact path="/" element={< GoogleSignIn/>}/>
        <Route path={'/weather'} element={<Weather />}/>
        <Route path={'/search'} element={<Search />}/>
        <Route path={'/profile'} element={<Profile />} />
      </Routes>

    </div>


  );

};

export default NavBar;