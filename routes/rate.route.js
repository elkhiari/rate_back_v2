const express = require("express");
const rateRoute = express.Router();
const tokenVerfication = require("../middleware/auth.middleware");
const {
  AddRate,
  GetAllRate,
  countRate,
  deleteAll,
  getServices,
} = require("../controllers/rate.controller");

rateRoute.route("/").post(AddRate);
rateRoute.route("/").get(tokenVerfication, GetAllRate);
rateRoute.route("/count").get(tokenVerfication, countRate);
rateRoute.route("/delete").delete(tokenVerfication, deleteAll);
rateRoute.route("/services").get(tokenVerfication, getServices);

module.exports = rateRoute;
