// import depedencies
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// import route
const indexRouter = require('./routes/index.route');

// create app
const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// use middleware
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// config connection to mongodb
mongoose.connect('mongodb://localhost:27017/bread_mongo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db = mongoose.connection;
if (!db) {
  console.log('Error while connecting to database.')
} else {
  console.log('Database connected successfully.')
}

// use router
app.use('/', indexRouter);

// import module app
module.exports = app;