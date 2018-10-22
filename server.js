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

const { url } = require('./config/database.js');

mongoose.connect(url, {
   useNewUrlParser: true
});

require('./config/passport.js')(passport);

const port = 3000;

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
app.use((req, res) => res.sendFile(`${__dirname}/public/main.html`));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.info('listening on %d', port);
});
