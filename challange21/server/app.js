const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const client = new Client()

await client.connect();

const res = await client.query('select $1::text as message', ['Hello World!']);
console.log(res.rows[0].message);
await client.end();

const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/add', (req, res) => {
    res.render('add');
})

app.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});