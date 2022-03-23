// Core Dependencies
const express = require('express');
const morgan = require('morgan');
const InitiateMongoServer = require('./db/db');
const homeRoutes = require('./api/routes/home.routes');

// Instance of express
const app = express();

// Initiate Mongo Server
InitiateMongoServer();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set("views","./src/views");

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// logging
app.use(morgan('dev'));

//initialize routes
app.use(homeRoutes);

module.exports = app;
