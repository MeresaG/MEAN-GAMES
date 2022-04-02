const dotenv = require('dotenv');
dotenv.config({path : './config/.env'});
require('./api/data/db');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const router =  require('./api/routes/games');


const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))


//Loggers
app.use(morgan('dev'));

//Handle static files
app.use(express.static(path.join(__dirname,
    "public")))

//Routes
app.use('/api', router);


const server = app.listen(process.env.PORT, () => {
    console.log(`Server running on ${server.address().port}`);
})