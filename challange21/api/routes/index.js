const express = require('express');
const router = express.Router();
const models = require('../models/index');
const moment = require('moment');
moment.locale('id');

/* GET home page. */
router.get('/', (req, res, next) => {
  const limit = 3;
  const currentPage = parseInt(req.query.page) || 1;
  const offset = parseInt(currentPage - 1) * limit;

  let filter = {}

  models.Record.findAndCountAll({
    limit,
    offset
  }).then(result => {
    const totalPage = Math.ceil(result.count / limit);
    const url = req.url === '/' ? '/?page=1' : req.url;
    res.json({
      result,
      totalPage,
      url,
      offset,
      limit,
      currentPage,
      query: req.query
    })
  })
    .catch(err => res.send(err))
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

router.put('/update/:id', (req, res, next) => {
  const { nama, umur, tinggi, tanggallahir, menikah } = req.body;
  const { id } = req.params
  models.Record.update({
    nama,
    tinggi,
    umur,
    tanggallahir,
    menikah
  }, {
    where: {
      id
    }
  }).then(result => res.json(result))
    .catch(err => res.send(err))
})

router.delete('/delete/:id', (req, res, next) => {
  const { id } = req.params
  models.Record.destroy({
    where: {
      id
    }
  }).then(result => res.json(result))
    .catch(err => res.send(err))
})

module.exports = router;
