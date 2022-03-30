const express = require('express');
const router = express.Router();

const gameController = require('../controllers/gameController');

router.route('/games')
        .get((req, res) => {
            gameController.getAll(req, res) 
        });


module.exports = router;