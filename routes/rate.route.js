const express = require('express');
const rateRoute = express.Router();
const tokenVerfication = require('../middleware/auth.middleware');
const {AddRate, GetAllRate, countRate, deleteAll} = require('../controllers/rate.controller');


rateRoute.route('/').post(AddRate);
rateRoute.route('/').get(tokenVerfication,GetAllRate);
rateRoute.route('/count').get(tokenVerfication,countRate);
rateRoute.route('/delete').delete(tokenVerfication,deleteAll);

module.exports = rateRoute;