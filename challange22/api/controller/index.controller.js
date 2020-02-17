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