var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;


/* GET home page. */

// db setup
MongoClient.connect('mongodb://localhost:27017/nodedb', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) console.error(err);
  console.log('db ok!');
  const db = client.db('nodedb');
  const bukuCollection = db.collection('buku');

  router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
  });

  router.get('/buku', (req, res, next) => {
    bukuCollection.find().toArray()
      .then(result => res.send(result)).catch(err => res.send(err));
  });

  router.post('/buku', (req, res, next) => {
    bukuCollection.insertOne(req.body)
      .then(result => res.status(201).json({ msg: 'success', result }))
      .catch(err => res.status(500).json(err));
  })
});



module.exports = router;
