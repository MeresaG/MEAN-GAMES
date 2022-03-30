const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const router =  require('./routes/games');
const req = require('express/lib/request');

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))

dotenv.config({path : './config/.env'});

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