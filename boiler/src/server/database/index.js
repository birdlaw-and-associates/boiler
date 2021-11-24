//Database
const { Sequelize, DataTypes, DECIMAL } = require('sequelize');
const mysql = require('mysql2/promise');

const db = new Sequelize({
  host: 'localhost',
  dialect: 'mysql',
  username: 'root',
  password: '',
  database: 'boiler',
});


/**
 *
 * User model
 *
 */

const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: DataTypes.STRING(255),
  email: DataTypes.STRING(255),
  lat: DataTypes.DECIMAL(9, 6),
  long: DataTypes.DECIMAL(9, 6),
});

/**
 * 
 * Restaurant model
 * 
 */

const Restaurant = db.define('Restaurant', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: DataTypes.STRING(255),
  price: DataTypes.DECIMAL(4, 2),
  address: DataTypes.STRING(255),
  lat: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: false
  },
  long: {
    type: DataTypes.DECIMAL(9, 6)
  },
  yelpRating: DataTypes.DECIMAL(1, 1),
  userRating: DataTypes.DECIMAL(5, 4),
  reviewCount: {
    type: DataTypes.INTEGER,
  },
  imageUrl: DataTypes.STRING(255),
});

/**
 * 
 * User_restaurants join table
 * 
 */

const Users_restaurants = db.define('Users_restaurants', {}, {timestamps: false});
User.belongsToMany(Restaurant, { through: Users_restaurants });
Restaurant.belongsToMany(User, { through: Users_restaurants });

mysql.createConnection({ user: 'root', password: ''})
  .then((db) => db.query('CREATE DATABASE IF NOT EXISTS `boiler`').then(() => db.end()))
  .then(() => console.log('\x1b[33m', '\nDatabase (MySQL): \'boiler\' successfully created!'))
  .then(() => User.sync())
  .then(() => console.log('\x1b[36m', '\nDatabase (MySQL): \'User\' table successfully created!'))
  .then(() => Restaurant.sync())
  .then(() => console.log('\x1b[36m', '\nDatabase (MySQL): \'Restaurant\' table successfully created!'))
  .then(() => Users_restaurants.sync())
  .then(() => console.log('\x1b[36m', '\nDatabase (MySQL): \'Users_restaurants\' table successfully created!'))
  .catch(err => console.log(':(', err));

module.exports = {
  db: db,
  User,
  Restaurant,
  Users_restaurants
};

/*
Users table:
-id: Number, auto-increment
-username: String,
*/


/*
restaurants table:
id: Number, auto-increment
title: String,
price: Number,
address: String (physical address)
geo: {
  lat: Number
  lon: Number (frontend distance to you)
}
photos: String (url to image)
yelpRating: Number
*/






/*
Joined Users_restaurants
id: Number, auto-increment
foreign_key: joined table (user id)
foreign_key: joined table (restaurant id)
*/










/*
Schema: {

}
*/

/*
Documenu Table:
-restaurant_id: String,
-restaurant_name: String,
-geo: {
  lat: Number
  lon: Number
},
-address: String,
-menu_item_price: Number,
-favorite: Boolean,
*/

/*
YELP table:
id: Number, auto-increment
businessName: String

*/



