const chalk = require("chalk")
const express = require("express")
const app = express();
const authRoutes = require('./Routes/auth.route.js');
const allRoute = require('./Routes/allRoute.js');

app.get('/',(req,res)=>{
    res.send("hello world")
});
app.get(`${process.env.BASE_URL}`,(req,res)=>{
    res.send("hello world with base url")
})

app.use('/auth', authRoutes);
app.use('/getname', allRoute)

app.listen(process.env.PORT || 3000, ()=>{
    console.log(chalk.yellow(`server connected on localhost:${process.env.PORT}`));
});

