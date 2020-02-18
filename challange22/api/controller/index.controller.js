Data = require('../models/index.models');

exports.index = (req, res) => {
  Data.get((err, data) => {
    if (err) {
      res.json({
        status: "error",
        message: err
      })
    }
    res.json({
      status: "success",
      message: "Contacts retrieved successfully",
      data: data
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