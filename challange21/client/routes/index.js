let express = require('express');
let router = express.Router();
let moment = require('moment');
let title = 'Postgres BREAD';

moment.locale('id');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title,
    moment: moment
  });
});

router.get('/add', (req, res, next) => {
  res.render('add', { title })
})

module.exports = router;