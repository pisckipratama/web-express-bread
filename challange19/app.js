const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
let parse = fs.readFileSync('data.json', 'utf8');
let data = JSON.parse(parse);

const app = express()

// set ejs and body parser
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// create main route
app.use('/', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.render('index', {
        data: data
    })
});

// create /add route
app.get('/add', (req, res) => res.render('add'));
app.post('/add', (req, res) => {
    data.push({
        id: data.length + 1,
        string: req.body.string,
        integer: req.body.integer,
        float: req.body.float,
        date: req.body.date,
        boolean: req.body.boolean
    });
    fs.writeFileSync('data.json', JSON.stringify(data, null, 3));
    res.redirect('/add');
})

// create /edit route
app.get('/edit', (req, res) => res.render('edit'));

app.listen(3000, () => {
    console.log(`running at http://localhost:3000`);
})