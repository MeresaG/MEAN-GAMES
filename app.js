const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const app = express();

dotenv.config({path : './config/.env'});

app.use("/public", express.static(path.join(__dirname,
    "public")))

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "app.js"));
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
})