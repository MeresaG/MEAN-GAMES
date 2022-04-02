const mongoose = require('mongoose');

const Game = mongoose.model(process.env.GAME_MODEL);

const getOne = (req, res) => {
    console.log("GET One Publisher controller");

    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;

    Game.findById(gameId).select('reviews').exec(function(err, game){
        if(err) {
            return res.status(500).json({error : err})
        }
        console.log("Game Found", game);
        return res.status(200).json(game.reviews.id(reviewId))
    })
} 

const getAll = (req, res) => {
    console.log("GET All Reviews controller");

    const gameId = req.params.gameId;

    Game.findById(gameId).select('reviews').exec(function(err, game){
        if(err) {
            return res.status(500).json({error : err})
        }
        console.log("Game Found", game);
        return res.status(200).json(game.reviews)
    })
} 

module.exports = {
    getOne: getOne,
    getAll: getAll
}
