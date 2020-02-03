const express = require('express');
const path = require('path');

const app = express()

app.set('views', path.join(__dirname, 'views')) // specify the views directory
app.set('view engine', 'ejs')

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.render('index'))

app.use('/add', express.static(path.join(__dirname, 'public')))

app.get('/add', (req, res) => res.render('add'))

app.use('/edit', express.static(path.join(__dirname, 'public')))

app.get('/edit', (req, res) => res.render('edit'))

app.listen(3000, () => {
    console.log(`running at http://localhost:3000`);
})