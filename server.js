//server.js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//OAuth
var session = require('express-session');
var passport = require('passport');

var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const activityRoutes = require('./routes/activities');
const reviewsRouter = require('./routes/reviews'); // Import the reviews router
const reviewController = require('./controllers/reviewController'); // Assuming you have this controller

//for PUT and DELETE requests
const methodOverride = require('method-override');

//OAuth
const ensureLoggedIn = require('./config/ensureLoggedIn');
const auths = require('./routes/auths');
const protectedRouteController = require('./controllers/protectedRouteController');

//OAuth
require('dotenv').config();
require('./config/database');
require('./config/passport');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

//OAuth
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
//Always mount AFTER the session middleware
app.use(passport.initialize());
app.use(passport.session());

// Add this middleware BELOW passport middleware
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

//app.use(passport.initialize());
//app.use(passport.session());
//app.use('/protectedRoute', /*ensureLoggedIn,*/ protectedRouteController.getProtectedPage);
//app.use(auths);

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(activityRoutes);
app.use('/', reviewsRouter); // Use the reviews router
app.use('/reviews', reviewsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
