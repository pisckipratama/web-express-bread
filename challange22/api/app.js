const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index.route');

const app = express();

app.use(logger('dev'));

app.use('/', indexRouter);

module.exports = app;
