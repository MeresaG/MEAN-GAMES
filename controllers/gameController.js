const gameData = require('../data/games.json');

module.exports.getAll = (req, res) => {
    console.log("Get All Controller called");
    return res.status(200).json(gameData);
}