const moment = require('moment');
const dataModels = require('../models/index.models');
moment.locale('id');

const getData = (req, res, next) => {
  // start logic for filtering
  let {
    checkString,
    checkInteger,
    checkFloat,
    checkBoolean,
    checkDate,
    inputString,
    inputFloat,
    inputInteger,
    inputBoolean
  } = req.query
  let querySearch = {}

  if (checkString === 'on' && inputString) {
    querySearch.string = req.query.inputString
  }

  if (checkInteger === 'on' && inputInteger) {
    querySearch.integer = req.query.inputInteger
  }

  if (checkFloat === 'on' && inputFloat) {
    querySearch.float = req.query.inputFloat
  }

  if (checkBoolean === 'on' && inputBoolean) {
    querySearch.boolean = req.query.inputBoolean
  }

  if (checkDate === 'on') {
    querySearch.date = {$gte: req.query.startDate, $lte: req.query.endDate}
  }

  // end logic for filtering

  // start logic for pagination 
  const page = req.query.page || 1;
  const limit = 3;
  const offset = (page - 1) * limit;
  const url = req.url === '/' ? '/?page=1' : req.url;

  dataModels.find(querySearch, (err, data) => {
    let totalData = data.length
    dataModels.find(querySearch, (err, data) => {
      if (err) res.json(err);

      for (let i = 0; i < data.length; i++) {
        data[i].date = moment(data[i].date).format('LL') === 'Invalid date' ? 'kosong' : moment(data[i].date).format('LL');
      }

      res.json({
        result: data,
        url,
        page,
        pages: Math.ceil(totalData / limit),
        query: req.query
      })
    }).skip(offset).limit(limit)
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