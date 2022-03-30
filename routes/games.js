const express = require('express');
const router = express.Router();

const gameController = require('../controllers/gameController');

router.route('/games')
        .get(gameController.getAll)
        .post(gameController.addOne);

router.route('/games/:gameIndex')
        .get((req, res) => {
            gameController.getOne(req, res) 
        });

module.exports = router;