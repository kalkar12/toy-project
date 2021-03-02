const mongoose = require('mongoose');
const {config} = require("../config/secretData");

// mongoose.connect('mongodb://localhost:27017/panda3', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect(`mongodb+srv://${config.mongoUser}:${config.mongoPass}@cluster0.3rvyc.mongodb.net/panda4`, {useNewUrlParser: true, useUnifiedTopology: true});




const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("mongo connect");
  // we're connected!
});

module.exports = db;