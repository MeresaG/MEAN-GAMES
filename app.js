const dotenv = require('dotenv');
dotenv.config({path : './config/.env'});
require('./api/data/db');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const router =  require('./api/routes/games');


const app = express();

//CORS
app.use('/api', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:4200');
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept');
    next();
})

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