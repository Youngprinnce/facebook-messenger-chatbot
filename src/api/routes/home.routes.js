const homeRoute = require('../../config/routerConfig');
const {home} = require('../controllers/home.controller');

homeRoute.get('/', home);

module.exports = homeRoute;
