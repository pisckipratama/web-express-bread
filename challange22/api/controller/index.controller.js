const moment = require('moment');
const dataModels = require('../models/index.models');
moment.locale('id');

const getData = (req, res, next) => {
  let {
    checkString,
    checkInteger,
    checkFloat,
    checkBoolean,
    checkDate
  } = req.query
  let querySearch = {}

  if (checkString === 'on') {
    querySearch.string = req.query.inputString
  }

  if (checkInteger === 'on') {
    querySearch.integer = req.query.inputInteger
  }

  if (checkFloat === 'on') {
    querySearch.float = req.query.inputFloat
  }

  if (checkBoolean === 'on') {
    querySearch.boolean = req.query.inputBoolean
  }

  if (checkDate === 'on') {
    querySearch.date = {$gte: req.query.startDate, $lte: req.query.endDate}
  }

  console.log(querySearch)
  dataModels.find(querySearch, (err, data) => {
    if (err) return next(err);

    for (let i = 0; i < data.length; i++) {
      data[i].date = moment(data[i].date).format('LL') === 'Invalid date' ? 'kosong' : moment(data[i].date).format('LL');
    }
    res.json({
      result: data
    })
  })
}

const addData = (req, res, next) => {
  dataModels.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
}

const getOne = (req, res, next) => {
  dataModels.findById(req.params.id, (err, data) => {
    if (err) return next(err)

    for (let i = 0; i < data.length; i++) {
      data[i].date = moment(data[i].date).format('LL') === 'Invalid date' ? 'kosong' : moment(data[i].date).format('LL');
    }

    res.json({
      result: data
    })
  })
}

const updateData = (req, res, next) => {
  dataModels.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err)
    res.json(post)
  })
}

const deleteData = (req, res, next) => {
  dataModels.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post)
  })
}

module.exports = {
  getData,
  addData,
  getOne,
  updateData,
  deleteData
}