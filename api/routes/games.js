const express = require('express');
const router = express.Router();

const gameController = require('../controllers/gameController');
const publisherController = require('../controllers/publisherController');
const reviewController = require('../controllers/reviewController');

router.route('/games')
        .get(gameController.getAll)
        .post(gameController.addOne)
        
        


router.route('/games/:gameId')
        .get(gameController.getOne)
        .put(gameController.updateOne)//patch
        .delete(gameController.deleteOne)

router.route('/games/:gameId/publisher')
        .get(publisherController.getOne)
        .post(publisherController.addOne)
        .put(publisherController.updateOne)//patch
        .delete(publisherController.deleteOne);

router.route('/games/:gameId/reviews')
        .get(reviewController.getAll)


router.route('/games/:gameId/reviews/:reviewId')
        .get(reviewController.getOne)

module.exports = router;