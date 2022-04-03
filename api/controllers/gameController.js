const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL)

module.exports.getAll = (req, res) => {
    console.log("Get All Controller called");
    const response = {
        status : process.env.HTTP_STATUS_OK,
        message : {} 
    }
    let offset = 0;
    let count = 3;
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
            response.status = process.env.HTTP_STATUS_OK;
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