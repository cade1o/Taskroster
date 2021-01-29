var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
 service: 'gmail',
 proxy: 'http://wdcmail.hopto.org',
 auth: {
        user: 'xiaofanlu123@gmail.com',
        pass: '`741258963aA'
    }
});

var mysql = require('mysql');

var dbConnectionPool = mysql.createPool({
    host:'localhost',
    database:'xiaoschema'
});

var app = express();

// Database
app.use(function(req,res,next){
    req.pool = dbConnectionPool;
    next();
});

app.use(function(req,res,next){
    req.tran = transporter;
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;



