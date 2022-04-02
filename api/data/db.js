const mongoose = require('mongoose');
require('./games-model')
mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", function() {
    console.log("Mongoose Connected to", process.env.DB_NAME);
})

mongoose.connection.on("disconnected", function() {
    console.log("Mongoose Disconnected to", process.env.DB_NAME);
})

mongoose.connection.on("error", function(err) {
    console.log("Mongoose Error", err);
})

process.on("SIGINT", function() {
    mongoose.connection.close(function() {
        console.log(process.env.SIGINT_MESSAGE);
        process.exit(0);
    })
})

process.on("SIGTERM", function() {
    mongoose.connection.close(function() {
    console.log(process.env.SIGTERM_MESSAGE);
    process.exit(0);
    });
});

process.once("SIGUSR2", function() {
    mongoose.connection.close(function() {
        console.log(process.env.SIGUSR2_MESSAGE);
        process.kill(process.pid, "SIGUSR2");
    })
})