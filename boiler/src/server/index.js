//Server definition
const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport-google-oauth2');
// const PORT = 8080;
dotenv.config({ path: '../.env' });
const PORT = 3000;
// const { DBName } = require('./db');
const distPath = path.resolve(__dirname, 'dist');

console.log('distPath:', distPath);
const { db, User, Restaurant, Users_restaurants } = require('./database/index.js');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('./dist'));

//for google passport use
// app.use(passport.initialize());
// app.use(passport.session());
// require('./config/passport')(passport);

// console.log('this is g client id: ', process.env.GOOGLE_CLIENT_ID);

//google oauth configure strategy
// passport.use(new GoogleStrategy({
//   clientID: '726401266288-tj76o0cb7esn7a7jbupusvp340lun1pg.apps.googleusercontent.com',
//   clientSecret: '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',
//   callbackURL: 'http://127.0.0.1:3000/auth/google/callback', //maybe need to change on deploy
//   passReqToCallback: true
// },
// function(request, accessToken, refreshToken, profile, done) {
//   User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     return done(err, user);
//   });
// }
// ));

////Server Routing////

//GET
// app.get('/', (req, res) => {
//   res.status(200).sendFile(path.resolve('./dist/index.html'));
// });

// app.get('/', (req, res) => {
//   res.sendFile(path.join(distPath, './index.html'));
// });


app.get('/api/restaurants', (req, res) => {
  Restaurant.findAll()
    .then(({data}) => {
      res.status(200).send(data);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

// google oauth request
app.get('/login', (req, res) => {
  res.status(200).send('login success');
});

// gets a user's favorite restaurants
app.get('/api/favorites/:id', (req, res) => {
  User.findByPk(req.params.id, {
    include: [
      {
        model: Restaurant,
        as: favoriteRestaurants
      }
    ]
  })
    .then(data => {
      res.status(200).send(data.favoriteRestaurants);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

//POST
// adds a user
app.post('/api/users', (req, res) => {
  const {name, email, lat, long} = req.body;
  User.create({
    username: name,
    email: email,
    lat: lat,
    long: long
  }).then(user => {
    res.status(201).json(user);
  }).catch(err => {
    console.error(err);
    res.sendStatus(500);
  });
});

app.post('/api/restaurants', (req, res) => {
  const { title, price, address, lat, long } = req.body;
  Restaurant.create({
    title: title,
    price: price,
    address: address,
    lat: lat,
    long: long
  })
    .then(restaurant => {
      res.status(201).json(restaurant);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

// adds a restaurant to favorites
app.post('/api/favorites/:id', (req, res) => {
  const restaurantId = req.body.id;

  Users_restaurants.create({
    UserId: req.params.id,
    RestaurantId: restaurantId
  })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

//PUT
// updates restaurant user ratings
app.put('/api/restaurants/:id', (req, res) => {
  const {userRating} = req.body;
  const target = Restaurant.findByPk(req.params.id);
  const newScore = target.userRating * target.reviewCount + userRating;
  target.set({
    userRating: newScore,
  });
  target.increment('reviewCount');
  target.save()
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

// updates restaurant with the rating from yelp
// must have restaurant title in body
app.put('/api/restaurants', (req, res) => {
  const {yelpRating, title} = req.body;
  Restaurant.update({yelpRating: yelpRating}, {
    where: {
      title: title
    }
  })
    .then(() => {
      res.sendStatus(200);
    }).catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

// updates user's location
// Body must have properties: lat and long
// ID in params is UserID
app.put('/api/users/:id', (req, res) => {
  const {lat, long} = req.body;
  User.update({lat: lat, long: long}, {
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

//DELETE
// ID in params is RestaurantID
app.delete('/api/restaurants/:id', (req, res) => {
  Restaurant.destroy({ where: { id: req.params.id }})
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

// ID in params is UserID, restaurant name in body
app.delete('/api/favorites/:id', (req, res) => {
  const {title} = req.body;
  const targetRestaurant = Restaurant.findOne({
    where: {
      title: title
    }
  });

  Users_restaurants.destroy({
    where: {
      UserId: req.params.id,
      RestaurantId: targetRestaurant.id
    }
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.delete('/api/users/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

//connection query

app.listen(PORT, () => {
  console.log(`
  Listening at: http://127.0.0.1:${PORT}
  `);
});

////Server Listener////
// initializeSchema({ connection: db })
//   .then(() => {
//     console.log('Initialized schema');
//     app.listen(PORT, () => console.info(`
//       Docs at http://127.0.0.1:${PORT}/__docs
//       Shortly is listening at http://127.0.0.1:${PORT}
//     `));
//   })
//   .catch((err) => console.error('Failed to initialize schema', err));