import React, { useState } from 'react';
import { useSharedUser } from './User.jsx';
import RestaurantList from './RestaurantList.jsx';
import axios from 'axios';


const Profile = (props) => {
  const { currentUser, changeCurrentUser } = useSharedUser();
  console.log('should be the current user', currentUser);
  const {name, email, imageUrl } = currentUser;
  // const [location, setLocation] = useState({lat: currentUser.lat, long: currentUser.long});
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ lat: latitude, long: longitude });
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    if (e.target.name === 'lat') {
      setLatitude(e.target.value);
    } else if (e.target.name === 'long') {
      setLongitude(e.target.value);
    }
  };

  const updateUser = (obj) => {
    axios.put('/api/users', {email: currentUser.email, lat: obj.lat, long: obj.long})
      .then(changeCurrentUser(Object.apply(currentUser, obj)))
      .catch(err => console.error(err))
      .finally(() => {
        setLatitude('');
        setLongitude('');
      });
  };


  return (
    <div>
      <div className='user-info'>
        <img src={imageUrl} alt="a user's portrait"/>
        <h2>{name}</h2>
        <h4>{email}</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Latitude
          <input type='text' value={latitude} name='lat' onChange={handleInputChange} required></input>
        </label>
        <label>Longitude
          <input type='text' value={longitude} name='long' onChange={handleInputChange} required></input>
        </label>
        <button type='submit'>SUBMIT</button>
      </form>
      <RestaurantList favorites={false} />
    </div>
  );

};

export default Profile;
