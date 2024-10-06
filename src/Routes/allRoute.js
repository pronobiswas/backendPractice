const express = require("express");
const { Router } = express;
const { createUserControler } = require("../userControler/userControler.js");
const authRoute = require("./auth.route.js");
const catagory = require("../userControler/Catragory.Controler.js");
const _ = Router();

// ======rootApi=======
_.get("/", (req, res) => {
  res.send("hello world");
});
_.use('/auth',authRoute);
_.use('/catagory',catagory);

module.exports = _;
