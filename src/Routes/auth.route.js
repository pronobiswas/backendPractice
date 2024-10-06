const express = require("express");
const { Router } = express;
const authRoute = Router();

authRoute.get("/", (req, res) => {
  res.send("authRoute/registration");
});
authRoute.get("/regestetion", (req, res) => {
  res.send("this is registration");
});

module.exports = authRoute;
