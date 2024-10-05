require('dotenv').config();
const {DBConnection} = require('./DatabaseConfig/DBconfig.js');
const app = require('./App.js')
//========databaseConnection=======
DBConnection()


