const moment = require('moment');
Data = require('../models/index.models');
moment.locale('id');

exports.index = (req, res) => {
  Data.get((err, data) => {
    if (err) {
      res.json({
        status: "error",
        message: err
      })
    }

    console.log(data);

    for (let i = 0; i < data.length; i++) {
      data[i].date = moment(data[i].date).format('LL');
      data[i].boolean = data[i].boolean == 1 ? true : false;
    }

    res.json({
      status: "success",
      message: "data retrieved successfully",
      result: data
    })
  })
}

exports.new = (req, res) => {
  let data = new Data();
  data.string = req.body.string;
  data.integer = req.body.integer;
  data.float = req.body.float;
  data.date = req.body.date;
  data.boolean = req.body.boolean == 'true' ? 1 : 0;
  data.save((err) => {
    if(err) res.json(err);
    res.json({
      message: "New data created",
      data: data
    })
  })
}

exports.delete = (req, res) => {
  Data.remove({
    _id: req.params.data_id
  }, (err, data) => {
    if (err) res.send(err)
    res.json({
      status: "Success",
      message: "Contact deleted"
    })
  })
}