const gameData = require('../data/games.json');

module.exports.getAll = (req, res) => {
    console.log("Get All Controller called");

    let offset = 0;
    let count = 5;
    if(req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if(req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    const pageGames = gameData.slice(offset, offset + count);
    return res.status(200).json(pageGames);
}

module.exports.addOne = (req, res) => {
    return res.status(200).json(req.body);
}

module.exports.getOne = (req, res) => {
    console.log("Get All Controller called");
    return res.status(200).json(gameData[req.params.gameIndex]);
}