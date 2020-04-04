const express = require('express');
const router = express.Router();
const models = require('../models/index');
const moment = require('moment');
moment.locale('id');

/* GET home page. */
router.get('/', (req, res, next) => {
  models.Record.findAll({}).then(data => {
    res.json({
      status: 'ok',
      message: 'success retrive data',
      data
    })
  })
});

router.post('/add', (req, res, next) => {
  const { nama, umur, tinggi, tanggallahir, menikah } = req.body;
  models.Record.create({
    nama,
    umur,
    tinggi,
    tanggallahir,
    menikah
  }).then(data => res.json({
    status: "ok",
    message: "success add data",
    data
  })).catch(err => res.send(err));
})

module.exports = router;
