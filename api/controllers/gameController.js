const { query } = require("express");
const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL)


const _updateOne = function(req, res, gameUpdateCallback) {
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

    Game.findById(gameId).exec(function(err, game) {
        if(err) {
            console.log("Error finding game");
            response.status = process.env.HTTP_STATUS_INTERNAL_ERROR;
            response.message = err;

        } 
        else if(!game) {
            console.log("game is null");
            response.status = process.env.HTTP_STATUS_NOTFOUND;
            response.message = {message : "Game with given Id not found"};
            }
        if(game) {
            gameUpdateCallback(req, res, game, response)
        }
        else {
            return res.status(response.status).json(response.message);
        }
    });

}


const _runGeoQuery = function(req, res, offset, count) {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const distance = parseInt(req.query.distance) || 1000;
    const point  = {
        type:"Point",
        coordinates:[lng, lat]
    };
    const query = {
        "publisher.location.coordinates" : {
            $near : {
                $geometry:point, 
                $minDistance:0, 
                $maxDistance:distance
            }
        }
    };
    Game.find(query).skip(offset).limit(count).exec(function(err, game) {
        if(err) {
            console.log("Geo Error", err);
            res.status(500).json(err);
        }else {
            console.log("Geo results", game);
            res.status(200).json(game);
        }
    })
}

module.exports.getAll = (req, res) => {
    console.log("Get All Controller called");

    
    const response = {
        status : process.env.HTTP_STATUS_OK,
        message : {} 
    }
    let offset = 0;
    let count = 10;
    if(req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if(req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
        
    }
    if(isNaN(offset) || isNaN(count)) {
        console.log("Offset or Count is not a number");
        response.status = process.env.HTTP_STATUS_NOTFOUND;
        response.message = {message : "Offset and Count must be  digits"};
        
    }
    if(response.status !== process.env.HTTP_STATUS_OK) {
        return res.status(response.status).json(response.message);
    }
     else {
        count = count > 10 ? 10 : count;
        if(req.query && req.query.lat && req.query.lng) {
            _runGeoQuery(req, res, offset, count);
            return ;
        }
        Game.find().skip(offset).limit(count).exec(function(err, games) {
            if(err) {
                response.status = process.env.HTTP_STATUS_INTERNAL_ERROR;
                response.message = err;

            }
            else {
                console.log("Found games");
                response.status = process.env.HTTP_STATUS_OK;
                response.message = games;
            }
            return res.status(response.status).json(response.message)
            
            });
    }
}

module.exports.addOne = (req, res) => {
    console.log("Add One Controller called");
    const response = {
        status : process.env.HTTP_STATUS_OK,
        message : {} 
    }
    const newGame = {
        title: req.body.title,
        year: req.body.year,
        rate: req.body.rate, 
        price: req.body.price,
        minPlayers: req.body.minPlayers, 
        maxPlayers: req.body.maxPlayers,
        publisher: {name: "NoName"}, 
        reviews: [], 
        minAge: req.body.minAge,
        designers: [req.body.designers]
    };

    Game.create(newGame, function(err, game) {

        if (err) {
            console.log("Error creating game");
            response.status= process.env.HTTP_STATUS_INTERNAL_ERROR;
            response.message= err;
        }
        else {
            response.status = process.env.HTTP_STATUS_CREATED;
            response.message = game;
        }
        res.status(response.status).json(response.message);
        
    })   
    
}

module.exports.getOne = (req, res) => {
    console.log("Get One Controller called");
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

    Game.findById(gameId).exec(function(err, games) {
        if(err) {
            console.log("Error reading game");
            response.status = process.env.HTTP_STATUS_INTERNAL_ERROR;
            response.message = {error : err};

        } 
        else {
            if(games) {
                console.log("Found Game");
                response.status = process.env.HTTP_STATUS_OK;
                response.message = games;
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

module.exports.deleteOne = (req, res) => {
    console.log("Delete One Controller called");
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

    Game.findByIdAndDelete(gameId).exec(function(err, deletedGame) {
        if(err) {
            console.log("Error reading game");
            response.status = process.env.HTTP_STATUS_INTERNAL_ERROR;
            response.message = {error : err};

        } 
        else if(!deletedGame) {
            console.log(" Game to delete not found");
            response.status = process.env.HTTP_STATUS_NOTFOUND;
                response.message = {"message": "Game ID not found"};
        }
        else {
                console.log("Found Game to delete");
                response.status = process.env.HTTP_STATUS_OK;
                response.message = deletedGame;
        }

        return res.status(response.status).json(response.message);
        
        });
}

module.exports.updateOne = function(req, res) {
    console.log("Update One Game Controller");
    gameUpdate = function(req, res, game, response) {
        game.title = req.body.title;
        game.year = req.body.year;
        game.rate = req.body.rate;
        game.price = req.body.price;
        game.maxPlayers = req.body.maxPlayers;
        game.minPlayers = req.body.minPlayers;
        game.minAge = req.body.minAge;
        game.designers =req.body.designers;
        if(req.body.name) {
            console.log("Name Passed");
            game.publisher.name = req.body.name;
        } else {
            console.log("No Name passed");
            game.publisher = { name: "NoName" };
        }
        game.reviews = [];
        game.save(function(err, updatedGame) {
            if(err) {
                response.status = process.env.HTTP_STATUS_INTERNAL_ERROR;
                response.message = err;
            }
            else {
                response.status = process.env.HTTP_STATUS_UPDATED;
                response.message = updatedGame;
            }
            return res.status(response.status).json(response.message)
        })
    }
    _updateOne(req, res, gameUpdate);
}

module.exports.partialUpdate = function(req, res) {
    console.log("Partial Update Game Controller");
    partialGameUpdate = function(req, res, game, response) {
        game.title = req.body.title || game.title;
        game.year = req.body.year || game.year;
        game.rate = req.body.rate || game.rate;
        game.price = req.body.price || game.price;
        game.maxPlayers = req.body.maxPlayers || game.maxPlayers ;
        game.minPlayers = req.body.minPlayers || game.minPlayers ;
        game.minAge = req.body.minAge || game.minAge;
        game.designers =req.body.designers || game.designers; 
        if(req.body.name) {
            console.log("Name Passed");
            game.publisher.name = req.body.name;
        } 
        
        game.save(function(err, updatedGame) {
            if(err) {
                response.status = process.env.HTTP_STATUS_INTERNAL_ERROR;
                response.message = err;
            }
            else {
                response.status = process.env.HTTP_STATUS_OK;
                response.message = updatedGame;
            }
            return res.status(response.status).json(response.message)
        })
    }
    _updateOne(req, res, partialGameUpdate);
}