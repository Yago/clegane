'use strict';

var express       = require('express'),
    app           = express(),
    port          = process.env.PORT || 3010,
    mongoose      = require('mongoose'),
    passport      = require('passport'),
    flash         = require('connect-flash'),
    compression   = require('compression'),
    morgan        = require('morgan'),
    cookieParser  = require('cookie-parser'),
    bodyParser    = require('body-parser'),
    session       = require('express-session'),
    MongoStore    = require('connect-mongo')(session),
    swig          = require('swig'),
    filters       = require('./app/filters');

var config        = require('./config/config.js'),
    api           = require('./config/api.js');

// Connect to database
mongoose.connect(config.db);

// pass passport configuration
require('./config/passport')(passport);

// set up our express application
console.log(app.get('env'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// setting template engine
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
swig.setFilter('recent', filters.recent);
swig.setFilter('previous', filters.previous);
swig.setFilter('next', filters.next);
swig.setFilter('numberArray', filters.numberArray);
swig.setFilter('paginationArray', filters.paginationArray);

// disable cache
if (config.debug) {
  app.set('view cache', false);
  swig.setDefaults({ cache: false });
}

// required for passport
app.use(session({
  name: 'pingp',
  secret: config.secret,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// custom middleware to expose some variable to the views
app.use(function(req, res, next) {
  res.locals.req = req;
  res.locals.user = req.user;
  res.locals.api = api;
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.is_granted = function (role) {
    return req.isAuthenticated() && req.user.roles.indexOf(role) >= 0;
  };
  res.locals.flashes = req.flash();
  next();
});

// static files ================================================================
app.use(compression());
app.use(express.static(__dirname + '/build'));

// routes ======================================================================
require('./app/routes/user.routes')(app, passport);
require('./app/routes/search.routes')(app, passport);
require('./app/routes/movie.routes')(app, passport);
require('./app/routes/tv.routes')(app, passport);
require('./app/routes/person.routes')(app, passport);

// launch ======================================================================
app.listen(port);
console.log('Server started on port ' + port);
