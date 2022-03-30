const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { Server } = require('http');

const app = express();

dotenv.config({path : './config/.env'});

app.use(express.static(path.join(__dirname,
    "public")))

// app.get('/', (req, res) => {
//     res.status(200).sendFile(path.join(__dirname, "app.js"));
// })

const server = app.listen(process.env.PORT, () => {
    console.log(`Server running on ${server.address().port}`);
})