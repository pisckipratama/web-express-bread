const express = require('express');
const bodyParser = require('body-parser');
const InitiateMongoServer = require("./config/db");
const usersRouter = require('./routes/users')

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ message: "API working" });
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use('/users', usersRouter);

app.listen(PORT, () => console.log(`server running at http://localhost:${PORT}`));