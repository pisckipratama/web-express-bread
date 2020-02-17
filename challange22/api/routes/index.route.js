const express = require('express');
const router = express.Router();
const dataController = require('../controller/index.controller')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({ status: "API it's working", message: "Happy coding brother/sister :)" });
});

router.route('/api')
  .get(dataController.index)

module.exports = router;
