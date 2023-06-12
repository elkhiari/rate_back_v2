const express = require('express');
const userRoute = express.Router();
const {me, getAllUsers, activeUser, deactiveUser} = require('../controllers/user.controller');
const tokenVerfication = require('../middleware/auth.middleware');

userRoute.route('/me').get(tokenVerfication,me);
userRoute.route('/').get(tokenVerfication,getAllUsers)
userRoute.route('/active/:id').put(tokenVerfication,activeUser)
userRoute.route('/deactive/:id').put(tokenVerfication,deactiveUser)

module.exports = userRoute;
