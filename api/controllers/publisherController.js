const mongoose = require('mongoose');

const Game = mongoose.model(process.env.GAME_MODEL);

const getOne = (req, res) => {
    console.log("GET One Publisher controller");
    const gameId= req.params.gameId;
    const response = {
        status : process.env.HTTP_STATUS_OK,
        message : {} 
    }
    //check if gameId is valid
    if(!mongoose.isValidObjectId(gameId)) {
            console.log("invalid Id");
            response.status = process.env.HTTP_STATUS_NOTFOUND;
            response.message = {message : "Invalid gameId"}
            return res.status(response.status).json(response.message)
    }

    Game.findById(gameId).select('publisher').exec(function(err, games) {
        if(err) {
            console.log("Error reading game");
            response.status = process.env.HTTP_STATUS_INTERNAL_ERROR;
            response.message = {error : err};

        } 
        else {
            if(games) {
                console.log("Found Game");
                response.status = process.env.HTTP_STATUS_OK;
                response.message = games.publisher;
            }
            else {
                console.log("game is null");
                response.status = process.env.HTTP_STATUS_NOTFOUND;
                response.message = {message : "Game with given Id not found"};
            }
        }

        return res.status(response.status).json(response.message);
        
        });
} 

module.exports = {
    getOne: getOne,
}
