// import dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');

// create express app 
const app = express();

// set template engine ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set bodyparser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// setting db connection
const dbName = path.join(__dirname, 'data', 'bread.db');
const db = new sqlite3.Database(dbName, (err) => {
    if (err) {
        return console.error(err.message);
    }
})

// create main route
app.use('/', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    const sql = `select * from data order by id`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        res.render('index', {
            model: rows
        });
    })
});

// create add route
app.get('/add', (req, res) => res.render('add'));
app.post('/add', (req, res) => {
    const data = [req.body.string, parseInt(req.body.integer), parseFloat(req.body.float), req.body.date, req.body.boolean === 'true' ? 1 : 0];
    const sql = `insert into data (string, integer, float, date, boolean) values(?, ?, ?, ?, ?)`;
    db.run(sql, data, (err) => {
        if (err) {
            return console.error(err.message);
        }
        res.redirect('/');
    })
})

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    const sql = `select * from data where id = ?`;
    db.get(sql, id, (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        res.render('edit', {
            model: row
        });
    })
})

app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const data = [req.body.string, parseInt(req.body.integer), parseFloat(req.body.float), req.body.date, req.body.boolean === 'true' ? 1 : 0, id];
    const sql = `update data set string = ?, integer = ?, float = ?, date = ?, boolean = ? where (id = ?)`;
    db.run(sql, data, (err) => {
        if (err) {
            console.error(err.message);
        }
        res.redirect('/');
    })
})

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = `delete from data where id=?`;
    db.run(sql, id, (err) => {
        if (err) {
            return console.error(err.message);
        }
        res.redirect('/');
    })
})

app.listen(3000, () => {
    console.log('server running on http://localhost:3000');
})