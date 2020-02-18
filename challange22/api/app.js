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

// use middleware
app.use(cors())
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// config connection to mongodb
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/bread_mongo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
})
.then(() => console.log('DB connected successfully'))
.catch((err) => console.error(err))

// use router
app.use('/', indexRouter);

// import module app
module.exports = app;