const mongoose = require('mongoose');

const Game = mongoose.model(process.env.GAME_MODEL);

const getOne = (req, res) => {
    console.log("GET One Publisher controller");

    const gameId = req.params.gameId;

    Game.findById(gameId).select('publisher').exec(function(err, game){
        if(err) {
            res.status(500).json({eror : err})
        }
        console.log("Game Found", game);
        res.status(200).json(game.publisher)
    })
} 

module.exports = {
    getOne: getOne,
}
