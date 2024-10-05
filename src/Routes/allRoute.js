const express = require("express");
const { Router } = express;
const { createUserControler } = require("../userControler/userControler.js");
const _ = Router();

_.route("/").get((req,res)=>{
    res.send("oh nice")
});
_.route("/name").get(createUserControler);

module.exports = _;
