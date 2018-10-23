const express = require('express');

const app = express();
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
var debug = require('debug')('liveconnect:server');
var http = require('http');


//const { url } = require('./config/database.js');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mike')

require('./config/passport.js')(passport);



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
// required for passport
app.use(session({
	secret: 'faztwebtutorialexample',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Set public folder as root
app.use(express.static('public'));

// routes
require('./routes/routes.js')(app, passport);


// Provide access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Redirect all traffic to main.html
//app.use((req, res) => res.sendFile(`${__dirname}/public/main.html`));



var port = normalizePort(process.env.PORT || '3000');
app.set('port' , port);

var server = http.createServer(app);

server.listen(port);
server.on('error' , onError);
server.on('listening' , onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
