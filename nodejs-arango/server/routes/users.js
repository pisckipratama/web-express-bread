const express = require('express');
const router = express.Router();

var arangojs = require("arangojs");
var db = new arangojs.Database();
db.useBasicAuth('root', 'nopassword');
const collection = db.collection("User");

/* GET users listing. */
router.get('/', async (req, res, next) => {

  try {
    const doc = await collection.all();
    res.status(200).json(doc._result);
  } catch (err) {
    console.error(err.stack);
    res.json(err.stack);
  }
});


module.exports = router;
