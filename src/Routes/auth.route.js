const express = require("express");
const { createUserControler } = require("../userControler/userControler");
const { Router } = express;
const authRoute = Router();

authRoute.get("/", (req, res) => {
  res.send("authRoute/registration");
});
authRoute.get("/reg", (req, res) => {
  res.send("this is registration");
});

authRoute.route("/registration").post(createUserControler);

module.exports = authRoute;
