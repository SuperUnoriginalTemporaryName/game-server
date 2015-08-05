var express          = require('express');
var app              = express();
var session          = require('express-session');
var passport         = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var colors           = require('colors');
var format           = require('format');
var checkEnv         = require('check-env');
var db               = require('./models');
var Promise          = require('es6-promise').Promise;

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

app.use(session({ 
  saveUninitialized: false,
  resave: false,
  secret: 'westerfeldian' 
}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['emails']
  },
  function (accessToken, refreshToken, profile, done) {
    var email = profile.emails[0];

    var createUser = function () {
      return new Promise((resolve, reject) => {
        var u;
        db.sequelize.transaction(t => {
          return db.User.create({}, { transaction: t })
            .then(user => {
              user.setEmails([{ email: email }], { transaction: t })
              u = user;
            });
        }).then(() => {
          debugger;
          resolve(u);
        }).catch(reject);
      });
    };

    var getUser = function (emailObj) {
      if (emailObj) return emailObj.getUser();
      else return createUser();
    };

    db.Email
      .find({
        where: { email: email.value }
      })
      .then(getUser)
      .then(function (user) {
        done(null, user);
      });



    // var promises = [];

    // var found = [];

    // var addEmails = function (user) {
    //   profile.emails.forEach(function (email) {
    //     db.Email.findOrCreate(email)
    //   });
    // };

    // var createNewUser = function () {
    //   db.User.create({})
    // };

    // profile.emails.forEach(function (email) {
    //   var promise = db.Email.find({
    //     where: { email: email.value }
    //   });

    //   promise.then(function (obj) {
    //     if (obj) found.push(obj);
    //   });

    //   promises.push(promise);
    // });

    // Promise
    //   .all(promises)
    //   .then(function () {
    //     var userPromise;
    //     if (found.length === 0)
    //       userPromise = createNewUser();

    //     userPromise
    //       .then(addEmails);
    //   });
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
  res.status(200).send("FAIL").end();
});

app.listen(3000);