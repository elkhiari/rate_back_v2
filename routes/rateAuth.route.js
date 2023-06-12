const {AddFingv,getAllFingv,authFingv,deleteFingv} = require('../controllers/rateAuth.controller.js');
const tokenVerfication = require('../middleware/auth.middleware');
const express = require('express');
const rateAuthRoute = express.Router();

rateAuthRoute.route('/').post(tokenVerfication,AddFingv).get(tokenVerfication,getAllFingv)
rateAuthRoute.route('/auth').post(authFingv)
rateAuthRoute.route('/delete/:id').delete(tokenVerfication,deleteFingv)

module.exports = rateAuthRoute;