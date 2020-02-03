const express = require('express');
const path = require('path');
const fs = require('fs');
let parse = fs.readFileSync('data.json', 'utf8');
let data = JSON.parse(parse);

const app = express()

// set ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// create main route
app.use('/', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.render('index', {data:data})
});

// create /add route
app.get('/add', (req, res) => res.render('add'));

// create /edit route
app.get('/edit', (req, res) => res.render('edit'));

app.listen(3000, () => {
    console.log(`running at http://localhost:3000`);
})