const express = require('express');
const router = express.Router();
const dataController = require('../controller/index.controller')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({ status: "API it's working", message: "Happy coding brother/sister :)" });
});

router.get('/api', dataController.getData)
router.get('/api/:id', dataController.getOne)
router.post('/api', dataController.addData)
router.put('/api/:id', dataController.updateData)
router.delete('/api/:id', dataController.deleteData)

module.exports = router;
