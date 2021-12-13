import React, { useState, createContext, useContext } from 'react';
import { useGoogleLogin } from 'react-google-login';
import { useBetween } from 'use-between';
import axios from 'axios';


// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';

const googleKey = require('../../../config/keys').googleOAuth.APIkey;

const clientId = googleKey;

import { useSharedUser } from './User.jsx';
// export const UserContext = createContext();

// eslint-disable-next-line func-style
function GoogleSignIn() {

  const {currentUser, changeCurrentUser} = useSharedUser();

  const onSuccess = (res) => {
    // console.log('Login Success: current user:', res.profileObj);
    // console.log('res object: ', res);
    // // changeCurrentUser(res.profileObj);
    // console.log('currentUser from GoogleSignIn', currentUser);


    axios.post('/api/users', res.profileObj)
      .then((user) => {
        // changeCurrentUser(res.profileObj);
        console.log('User successfully saved');
      })
      .catch((err) => { console.log('Unable to save user', err); })
      .finally(changeCurrentUser(res.profileObj));
    console.log(
      `Logged in successfully to ${res.profileObj.name}. \n See console for full profile object.`
    );
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      'Failed to login.'
    );
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
  });

  return (
    <button onClick={signIn} className="button">
      <img src="icons/google.svg" alt="google login" className="icon"></img>

      <span className="buttonText">Sign in with Google</span>
    </button>
  );
}

export default GoogleSignIn;

// import React from 'react';
// import { GoogleLogin } from 'react-google-login';

// class GoogleSignIn extends React.Component {
//   constructor(props) {
//     super(props);
//     this.onSignIn = this.onSignIn.bind(this);
//   }

//   onSignIn(response) {
//     // decodeJwtResponse() is a custom function defined by you
//     // to decode the credential response.
//     const responsePayload = decodeJwtResponse(response.credential);

//     console.log('ID: ' + responsePayload.sub);
//     console.log('Full Name: ' + responsePayload.name);
//     console.log('Given Name: ' + responsePayload.given_name);
//     console.log('Family Name: ' + responsePayload.family_name);
//     console.log('Image URL: ' + responsePayload.picture);
//     console.log('Email: ' + responsePayload.email);
//   }

//   decodeJwtResponse(response) {
//     console.log(response);
//   }

//   // render() {
//   //   return (
//   //     <div class="g-signin2" data-onsuccess={this.onSignIn}></div>
//   //   );
//   // }

//   render() {
//     return (
//       <div>
//         <div id="g_id_onload"
//           data-client_id="726401266288-2vtmi6h3uujngjisd9uu7ic0t95f7v8b.apps.googleusercontent.com"
//           data-context="signup"
//           data-ux_mode="popup"
//           // data-login_uri="http://localhost:3000/login"
//           data-auto_prompt="false"
//           data-callback="this.onSignIn">
//         </div>

//         <div className="g_id_signin"
//           data-type="standard"
//           data-shape="rectangular"
//           data-theme="filled_blue"
//           data-text="signin_with"
//           data-size="large"
//           data-logo_alignment="left">
//         </div>
//       </div>
//     );
//   }
// }

// export default GoogleSignIn;
