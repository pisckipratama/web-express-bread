let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');
let moment = require('moment');

moment.locale('id');

// set db connection 
const { Pool } = require('pg')
const pool = new Pool({
  user: 'pisckipy',
  host: 'localhost',
  database: 'bread_pg',
  password: 'Bismillah',
  port: 5432,
})

var indexRouter = require('./routes/index')(pool);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/api', indexRouter);

module.exports = app;