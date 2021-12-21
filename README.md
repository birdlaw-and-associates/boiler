# boiler

## Overview
Boiler is an app that makes it easier for a user to find the restaurants in their area that serve seafood.
***
### Database
We used a MySQL relational database. This allowed us to utilize joining tables to keep track of user details regarding their favorite restaurants.

### Server
We used Node.JS Express for our server. (version 14 and up)

### Authentication
Our authentication was done using Google OAuth2. We have a google strategy set up so users must log in with their google account. Once logged in, the user has access to the whole site.

### APIS

We used three external APIs for this project:

1. [Yelp Fusion API](https://www.yelp.com/developers/documentation/v3/get_started) -
  This allowed us to search for restaurants in the category 'Seafood' by location.

 2. [Accuweather API](https://developer.accuweather.com/apis) -
  This allowed us to get a 5 day forecast based on the city location.

 3. [Google OAuth2](https://developers.google.com/identity/protocols/oauth2) - 
  This allows us to use Google's OAuth2 feature to authenticate our users with a Google account.

### Styling
We used MaterialUI and emotion-react for our styling.

### Framework
The framework we used was React with React hooks.

***
# Getting Started

In the `boiler/boiler/config` directory, make a file named `keys.js'. This file needs the following info with your keys added like below:

```
module.exports = {
  api: {
    accuweather: 'KEY',
  },
  yelp: {
    clientID: 'ID',
    APIkey: 'KEY'
  },
  googleOAuth: {
    APIkey: 'KEY'
  },
};
```
## Start Up Scripts
### Inside of the `boiler/boiler` directory run the following scripts:  
* `npm install` to install all dependencies  
* `npm run build:client-dev` to run webpack  
* `npm start` to start the server on port 3000 and initialize the database.  


