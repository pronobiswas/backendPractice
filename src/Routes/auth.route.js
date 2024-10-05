const express = require("express");
const { Router } = express;
const authRoute = Router();

authRoute.get("/", (req, res) => {
  res.send("authRoute/registration");
});

module.exports = authRoute;
