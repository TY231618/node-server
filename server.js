const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/User');
require('./services/passport');
const keys = require('./config/keys');

const app = express();

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}));

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;

mongoose.connect(keys.mongoURI, (err) => {
  if(err) {
    return console.log('MongoDB connection error: ', err);
  }

  return console.log('MongoDb connection successfull');
});

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if(process.env.NODE_ENV === 'production') {
  //express will serve production assests e.g main.js

  app.use(express.static('client/build'));

  //express will serve index.html file if it doesnt recognise the route

  const path = require('path');

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, (err) => {

  if(err) {
    return console.log('Error connecting to server: ', err);
  }

  return console.log('Server started on port: ', PORT);
});