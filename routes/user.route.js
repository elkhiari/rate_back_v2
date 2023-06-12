const express = require('express');
const userRoute = express.Router();
const {me, getAllUsers, LockUser} = require('../controllers/user.controller');
const tokenVerfication = require('../middleware/auth.middleware');

userRoute.route('/me').get(tokenVerfication,me);
userRoute.route('/').get(tokenVerfication,getAllUsers)
userRoute.route('/:id').put(tokenVerfication,LockUser)


module.exports = userRoute;
