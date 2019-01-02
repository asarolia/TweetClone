var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
// import session for persistent sessions on authentication
var session = require('express-session');
// import passport for implementing API authentication
var passport = require('passport');

//Initialize mongoose schemas by importing here
require('./models/postmodel')
require('./models/usermodel')
// Initialize and get the database object
var db = require('./models/database');

// open the connection
db.open();



// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var api = require('./routes/api');
var auth = require('./routes/auth')(passport);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

// Added below to use express session as middleware for application and defined secret key to hash the passwords
// best practice is to keep the below secret in some environmnet variable outside code 
// but for time being we will go with this
app.use(session({
secret : 'My super duper secret key'
}));




app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add passport as middleware at the end of middleware chain
app.use(passport.initialize());
app.use(passport.session());

// initialize passport init file for authentication strategy
var initPassport = require('./passport-init');
initPassport(passport);
 


// app.use('/', indexRouter);
// app.use('/users', usersRouter);


app.use('/api', api);
app.use('/auth', auth);


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


// close db connection 
// app.use(function (req, res, next) {
  
//   res.on('close', db.close());

//   next();

// });


module.exports = app;
