const mongoose = require('mongoose');

const Game = mongoose.model(process.env.GAME_MODEL);

const _addPublisher= function (req, res, game, response) {
    game.publisher.name= req.body.name;
    game.publisher.country= req.body.country;
    game.publisher.established= req.body.established;

    game.save(function(err, updatedGame) {
        if (err) {
        response.status= process.env.HTTP_STATUS_INTERNAL_ERROR;
        response.message= err;
        } else {
        response.status= process.env.HTTP_STATUS_CREATED;
        response.message= updatedGame.publisher;
        }
        return res.status(response.status).json(response.message);
        });

}

const _updatePublisher= function (req, res, game, response) {
    
    game.publisher.name= req.body.name;
    game.publisher.country= req.body.country;
    game.publisher.established= req.body.established;

    game.save(function(err, updatedGame) {
        if (err) {
        response.status= process.env.HTTP_STATUS_INTERNAL_ERROR;
        response.message= err;
        } else {
        response.status= process.env.HTTP_STATUS_CREATED;
        response.message= updatedGame.publisher;
        }
        return res.status(response.status).json(response.message);
        });

}

const _deletePublisher = function(req, res, game, response) {
    game.publisher = {name : "NoName"}
    game.save(function(err, deletedGame) {
       
        if (err) {
            response.status= process.env.HTTP_STATUS_INTERNAL_ERROR;
            response.message= err;
        }
         else {
            response.status= process.env.HTTP_STATUS_CREATED;
            response.message= deletedGame.publisher;
        }
        return res.status(response.status).json(response.message);
        });
}



const getOne = function(req, res) {
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
                console.log("Found Game publisher");
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

const addOne = function(req, res) {

    console.log("Add one publisher controller added");
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

    Game.findById(gameId).select('publisher').exec(function(err, game) {
        if(err) {
            console.log("Error reading game");
            response.status = process.env.HTTP_STATUS_INTERNAL_ERROR;
            response.message = {error : err};

        } 
        else if(!game) {
                console.log("game is null");
                response.status = process.env.HTTP_STATUS_NOTFOUND;
                response.message = {message : "Game with given Id not found"};
        }
        if(game) {
            return _addPublisher(req, res, game, response);
        }
        else {
            return res.status(response.status).json(response.message);
        }   
        });

}

const updateOne = function(req, res) {
    console.log("Add one publisher controller added");
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

    Game.findById(gameId).select('publisher').exec(function(err, game) {
        if(err) {
            console.log("Error finding game");
            response.status = process.env.HTTP_STATUS_INTERNAL_ERROR;
            response.message = {error : err};

        } 
        else if(!game) {
                console.log("game is null");
                response.status = process.env.HTTP_STATUS_NOTFOUND;
                response.message = {message : "Game with given Id not found"};
        }
        if(game) {
            return _updatePublisher(req, res, game, response);
        }
        else {
            return res.status(response.status).json(response.message);
        }   
        });
}

const deleteOne = function(req, res) {

    console.log("Delete one publisher controller");
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

    Game.findById(gameId).select('publisher').exec(function(err, game) {
        if(err) {
            console.log("Error reading game");
            response.status = process.env.HTTP_STATUS_INTERNAL_ERROR;
            response.message = {error : err};

        } 
        else if(!game) {
                console.log("game is null");
                response.status = process.env.HTTP_STATUS_NOTFOUND;
                response.message = {message : "Game with given Id not found"};
        }
        if(game) {
            _deletePublisher(req, res, game, response);
        }
        else {
            return res.status(response.status).json(response.message);
        }   
        });

}

const partialUpdate = function(req, res) {

}

module.exports = {
    getOne: getOne,
    addOne: addOne,
    deleteOne: deleteOne,
    updateOne: updateOne,
    partialUpdate: partialUpdate
}
