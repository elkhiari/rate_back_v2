const express = require('express');
const authRoute = express.Router();
const {authController} = require('../controllers/auth.controller');

authRoute.route('/google').post(authController);

module.exports = authRoute;