const express = require("express");
const { Router } = express;
const catagory = Router();

catagory.get("/", (req, res) => {
    res.send("this is catagory");
  });
  
  module.exports = catagory;