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
        .put(gameController.updateOne)
        .delete(gameController.deleteOne)
        .patch(gameController.partialUpdate)

router.route('/games/:gameId/publisher')
        .get(publisherController.getOne)
        .post(publisherController.addOne)
        .put(publisherController.updateOne)
        .delete(publisherController.deleteOne)
        .patch(publisherController.partialUpdate)

router.route('/games/:gameId/reviews')
        .get(reviewController.getAll)


router.route('/games/:gameId/reviews/:reviewId')
        .get(reviewController.getOne)

module.exports = router;