var express          = require('express');
var app              = express();
var session          = require('express-session');
var passport         = require('passport');
var colors           = require('colors');
var format           = require('string-format');
var checkEnv         = require('check-env');
var db               = require('./models');
var tasks            = require('./tasks');
var port             = process.env.PORT || 3000;
var middleware       = require('./middleware');
var routers          = require('./routers');
var http             = require('http').Server(app);
var io               = require('socket.io')(http);
var path             = require('path');
var cookieParser     = require('cookie-parser')();

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
// CONFIGURE SESSION
//
var sessionMiddleware = session({ 
  saveUninitialized: false,
  resave: false,
  secret: 'westerfeldian',
  keys: ['chiiiiaaa', 'key2']
});

//
// CONFIGURE EXPRESS
//
app.use(cookieParser);
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', routers.auth);
app.use(middleware.auth);
app.use('/stats', routers.stats);

//
// CONFIGURE SOCKET.IO
//
io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res, next);
});
io.on('connection', socket => {
  var id = socket.request.session.passport.user;
  tasks.users
    .getById(id)
    .then(tasks.matchmaking.search);
});

http.listen(port, () => {
  var portStr = format('(PORT {})', port);
  console.log('ヽ༼ ಠ益ಠ ༽ﾉ'.green);
  console.log('WESTERFELD UP N\' RUNNIN\' BOSS'.green);
  console.log(portStr.green);
});