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
        id: data[data.length - 1].hasOwnProperty('id') ? data[data.length - 1].id + 1 : 1,
        string: req.body.string,
        integer: req.body.integer,
        float: req.body.float,
        date: req.body.date,
        boolean: (req.body.boolean == 'true')
    });
    fs.writeFileSync('data.json', JSON.stringify(data, null, 3));
    res.redirect('/');
})

// create /edit route
app.get('/edit/:id', (req, res) => {
    let query = req.params.id;
    let filter = data.filter(data => data.id === parseInt(req.params.id));
    let result = filter[0];
    res.render('edit', {
        data: data,
        query: query,
        result: result
    });
});

app.post('/edit/:id', (req, res) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == req.params.id) {
            data[i].string = req.body.string;
            data[i].integer = req.body.integer;
            data[i].float = req.body.float;
            data[i].date = req.body.date;
            data[i].boolean = (req.body.boolean == 'true');
        }
    }
    fs.writeFileSync('data.json', JSON.stringify(data, null, 3));
    res.redirect('/');
})

app.get('/delete/:id', (req, res) => {
    let result = data.filter(data => data.id !== parseInt(req.params.id));
    data = result;
    fs.writeFileSync('data.json', JSON.stringify(data, null, 3));
    res.redirect('/');
})

app.listen(3000, () => {
    console.log(`running at http://localhost:3000`);
})