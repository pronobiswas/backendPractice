const chalk = require("chalk")
const express = require("express")
const app = express();

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.listen(3000, ()=>{
    chalk.yellow(`server connected on localhost:3000`)
});

