var express          = require('express');
var app              = express();
var session          = require('express-session');
var passport         = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var colors           = require('colors');
var format           = require('string-format');
var checkEnv         = require('check-env');
var db               = require('./models');
var tasks            = require('./tasks');
var port             = process.env.PORT || 3000;
var middleware       = require('./middleware');
var http             = require('http').Server(app);
var io               = require('socket.io')(http);
var path             = require('path');

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
  db.User
    .findOne({
      where: {
        id: id
      }
    })
    .then(user => done(null, user))
    .catch(done);
});

app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/auth/success',
  failureRedirect: '/auth/failure'
}));

app.get('/auth/success', (req, res) => {
  var indexPath = path.join(__dirname, 'static/index.html');
  res.sendFile(indexPath);
  // res.status(200).end();
});

app.get('/auth/failure', (req, res) => {
  res.status(401).end();
});

app.use(middleware.auth);

app.get('/stats', (req, res, next) => {
  req.user.getStats()
    .then(stats => res.status(200).json(stats).end())
    .catch(next);
});

io.on('connection', socket => {
  console.log('a user connected');
});

http.listen(port, () => {
  var portStr = format('(PORT {})', port);
  console.log('ヽ༼ ಠ益ಠ ༽ﾉ'.green);
  console.log('WESTERFELD UP N\' RUNNIN\' BOSS'.green);
  console.log(portStr.green);
});