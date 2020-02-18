// import depedencies
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// import route
const indexRouter = require('./routes/index.route');

// create app
const app = express();

// use middleware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}))
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
