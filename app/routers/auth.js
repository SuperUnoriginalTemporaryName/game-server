var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var express  = require('express');
var router = express.Router();
var tasks = require('../tasks');
var db = require('../models');
var path = require('path');

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['emails']
  },
  (accessToken, refreshToken, profile, done) => {
    var email = profile.emails[0].value;
    tasks.users.getOrCreateByEmail(email)
      .then(user => {
        done(null, user);
      })
      .catch(done);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.User
    .findOne({
      where: {
        id: id
      }
    })
    .then(user => done(null, user))
    .catch(done);
});

router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/auth/success',
  failureRedirect: '/auth/failure'
}));

router.get('/success', (req, res) => {
  var indexPath = path.join(__dirname, '../static/index.html');
  res.sendFile(indexPath);
});

router.get('/failure', (req, res) => {
  res.status(401).end();
});

module.exports = router;