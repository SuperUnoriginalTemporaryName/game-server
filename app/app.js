var express          = require('express');
var app              = express();
var session          = require('express-session');
var passport         = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var colors           = require('colors');
var format           = require('string-format');
var checkEnv         = require('check-env');
var db               = require('./models');
var Promise          = require('es6-promise').Promise;
var tasks            = require('./tasks');
var port             = process.env.PORT || 3000;

//
// CHECK ENV VARS
//
try {
  checkEnv([
    'FACEBOOK_APP_ID',
    'FACEBOOK_APP_SECRET',
    'POSTGRES_CONNECTION_STRING'
  ]);
} catch (e) {
  console.log(e.toString().red);
  console.log('Quitting :)');
  process.exit();
}

//
// SESSION CONFIGURATION 
//
app.use(session({ 
  saveUninitialized: false,
  resave: false,
  secret: 'westerfeldian' 
}));

//
// AUTH CONFIGURATION
//
app.use(passport.initialize());
app.use(passport.session());

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

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  done(null, { 'fake': 'user', 'id': 0 });
});

app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { 
  successRedirect: '/test',
  failureRedirect: '/fail'
}));

app.get('/test', function (req, res) {
  debugger;
});

app.get('/fail', function (req, res) {
  debugger;
  res.status(200).send("FAIL").end();
});

app.listen(port, () => {
  var portStr = format('(PORT {})', port);
  console.log('ヽ༼ ಠ益ಠ ༽ﾉ'.green);
  console.log('WESTERFELD UP N\' RUNNIN\' BOSS'.green);
  console.log(portStr.green);
});