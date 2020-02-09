const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

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

app.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});