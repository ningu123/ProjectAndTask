var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");


// var employeRouter = require('./router/employeeRouter');


var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const signupRouter = require('./router/signup_router')
const signinRouter = require('./router/signin_router')
const projectRouter = require('./router/project_router')
const taskRouter = require('./router/task_router')
const logoutRouter = require('./router/logout_router')


app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.use('/Logout', logoutRouter);
app.use('/project', projectRouter);
app.use('/task', taskRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



module.exports = app;
