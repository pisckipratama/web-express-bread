const express = require('express');
const router = express.Router();

var arangojs = require("arangojs");
var db = new arangojs.Database();
db.useBasicAuth('root', 'nopassword');
const collection = db.collection("User");

/* GET /users - get all users */
router.get('/', async (req, res, next) => {

  try {
    const doc = await collection.all();
    return res.status(200).json(doc._result);
  } catch (err) {
    console.error(err.stack);
    return res.json(err.stack);
  }
});

/* GET /users/:key - get one user */
router.get('/:key', async (req, res, next) => {
  const { key } = req.params;

  try {
    const doc = await collection.byExample({ _key: key });
    return res.status(200).json(doc._result);
  } catch (err) {
    console.error(err.stack);
    return res.json(err.stack);
  }
});

/* POST /users - create user */
router.post('/', async (req, res, next) => {
  const { username, email } = req.body;

  try {
    const add = await collection.save({ username, email });
    return res.status(201).json(add);
  } catch (err) {
    console.error(err.stack);
    return res.json(err.stack);
  }
});

/* PUT /users/:key - update user */
router.put('/:key', async (req, res, next) => {
  const { key } = req.params;

  try {
    const update = await collection.update(key, req.body);
    return res.status(201).json(update);
  } catch (err) {
    console.error(err.stack);
    return res.json(err.stack);
  }
});

/* DELETE /users/:key - delete user */
router.delete('/:key', async (req, res, next) => {
  const { key } = req.params;
  try {
    const deleteUser = await collection.remove({ _key: key });
    return res.status(204).json(deleteUser);
  } catch (err) {
    console.error(err.stack);
    return res.json(err.stack);
  }
});

module.exports = router;
