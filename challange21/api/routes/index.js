const express = require('express');
const router = express.Router();
const models = require('../models/index');
const moment = require('moment');
const Sequelize = require('sequelize')
moment.locale('id');

/* GET home page. */
router.get('/', (req, res, next) => {
  const limit = 3;
  const currentPage = parseInt(req.query.page) || 1;
  const offset = parseInt(currentPage - 1) * limit;
  const op = Sequelize.Op

  const { inputID, checkID, checkString, inputString, checkInteger, inputInteger, checkFloat, inputFloat, checkDate, startDate, endDate, checkBoolean, inputBoolean } = req.query;
  let filter = {}

  if (checkID && inputID) {
    filter.id = inputID;
  }

  if (checkString && inputString) {
    filter.nama = {
      [op.iLike]: `%${inputString}%`
    }
  }

  if (checkInteger && inputInteger) {
    filter.umur = inputInteger
  }

  if (checkFloat && inputFloat) {
    filter.tinggi = inputFloat
  }

  if (checkDate && startDate && endDate) {
    filter.tanggallahir = {
      [op.between]: [startDate, endDate]
    }
  }

  if (checkBoolean && inputBoolean) {
    filter.menikah = inputBoolean
  }

  models.Record.findAndCountAll({
    where: filter,
    limit,
    offset
  }).then(result => {
    const totalPage = Math.ceil(result.count / limit);
    const url = req.url === '/' ? '/?page=1' : req.url;
    res.json({
      data: result,
      totalPage,
      url,
      currentPage,
    })
  })
    .catch(err => res.send(err))
});

router.get('/tes/:id', (req, res, next) => {
  const { id } = req.params

  models.Record.findAll({
    where: {
      id
    }
  }).then(result => res.json(result))
    .catch(err => res.send(err))
})

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
