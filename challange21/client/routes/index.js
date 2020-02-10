let express = require('express');
let router = express.Router();
let moment = require('moment');

moment.locale('id');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Postgres BREAD',
    moment: moment
  });
});

module.exports = router;