const express = require('express');
const mongoose = require('mongoose');
require('./services/passport');
const keys = require('./config/keys');
const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(keys.mongoURI, (err) => {
  if(err) {
    return console.log('MongoDB connection error: ', err);
  }

  return console.log('MongoDb connection successfull');
});

require('./routes/authRoutes')(app);

app.listen(PORT, (err) => {

  if(err) {
    return console.log('Error connecting to server: ', err);
  }

  return console.log('Server started on port: ', PORT);
});