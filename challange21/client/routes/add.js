var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/add', function(req, res, next) {
  res.render('add', { title: 'Postgres BREAD' });
});

module.exports = router;
