var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://heroku_hbfk1244:fd6q30qjacbtv0d580bmms91p7@ds151068.mlab.com:51068/heroku_hbfk1244');
var twilio = require('twilio');
// Twilio Credentials
var accountSid = 'AC4a65c018fca1b4693ea69aa208f1b98d';
var authToken = 'e55be36f2570d258092d7b53f0b76f35';
//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);
//Nodemailer code
// var nodemailer = require('nodemailer');

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// var helper = require('sendgrid').mail;


var index = require('./routes/index');
var recipes = require('./routes/recipes');


var app = express();

app.use(express.static(path.join(__dirname)));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', index);
app.use('/recipes', recipes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
