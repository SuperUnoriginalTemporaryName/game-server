var express           = require('express');
var app               = express();
var passport          = require('passport');
var FacebookStrategy  = require('passport-facebook').Strategy;
var colors            = require('colors');
var format            = require('format');
var checkEnv          = require('check-env');

//
// CHECK ENV VARS
//
try {
  checkEnv([
    'FACEBOOK_APP_ID',
    'FACEBOOK_APP_SECRET'
  ]);
} catch (e) {
  console.log(e.toString().red);
  console.log('Quitting :)');
  process.exit();
}

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://test.com'
  },
  function (accessToken, refreshToken, profile, done) {
    console.log(profile);
  }
));