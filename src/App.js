const chalk = require("chalk")
const express = require("express")
const app = express();
const cors = require("cors");
const authRoutes = require('./Routes/auth.route.js');
const allRoute = require('./Routes/allRoute.js');


// all middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(allRoute)

app.listen(process.env.PORT || 3000, ()=>{
    console.log(chalk.yellow(`server connected on localhost:${process.env.PORT}`));
});

