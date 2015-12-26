var express = require('express');
var path = require('path');
var logger = require('morgan');
require('dotenv').config({
  silent: true
});
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sessions = require("client-sessions");
var index = require('./routes/index');
var dashboard = require('./routes/dashboard');
var settings = require('./routes/settings');
var api = require('./routes/api');
var userDb = require("./model/users")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session setup
app.use(sessions({
  cookieName: 'BookieSession',
  secret: process.env.SessionSecret,
  duration: 24 * 60 * 60 * 1000,
  activeDuration: 1000 * 60 * 5
}));

// check for authentication 
app.use(function (req, res, next) {
  if (req.BookieSession && req.BookieSession.user) {

    userDb.findUser({
      email: req.BookieSession.user.email
    }, function (err, data) {
      
      if (!err && data !== null) {
        req.Authen = true;
        req.user = {
          username: req.BookieSession.user.username,
          email: req.BookieSession.user.email
        }
        next()
      }
    })
  }
  else {
    req.Authen = false;
    next();
  }

});

app.use('/', index);
app.use('/dashboard', dashboard);
app.use('/settings', settings);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
