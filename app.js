var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');




var MySQL_controller = require('./controllers/MySQL');
var theRouter = require('./routes/router');
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: '6wOBwJBStY'
}));

// TODO: Resolve the router situation
app.use('/', theRouter);
//app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/API', apiRouter);

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

if (process.argv.length > 2) {
    let arguement = process.argv[2];
    if (arguement == "dev") {
        console.log("Connecting to local development database");
    }
} else {
    MySQL_controller.connectToRemoteDatabase();
}

module.exports = app;