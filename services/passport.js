const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {

  User.findOne({ googleId: profile.id})
    .then((existingUser) => {
      if(existingUser) {
        return console.log('User with that ID already exists');
      }

      new User({ googleId: profile.id}).save((err) => {
        if(err) {
          return console.log('Error saving User: ', err);
        }
    
        return console.log('User saved successfully');
      });
    });
}));