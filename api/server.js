const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

const PORT = process.env.PORT || 5000;

passport.use(new GoogleStrategy());


app.listen(PORT, (err) => {

  if(err) return console.log('Error connecting to server: ', err);

  return console.log('Server started on port: ', PORT);
});