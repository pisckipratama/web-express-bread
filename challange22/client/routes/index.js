var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BREAD MongoDB' });
});

router.get('/add', function(req, res, next) {
  res.render('add', { title: 'BREAD MongoDB' });
});

module.exports = router;
