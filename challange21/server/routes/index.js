let express = require('express');
let router = express.Router();
let moment = require('moment');

moment.locale('id')
/* GET home page. */

module.exports = (pool) => {
  router.get('/', (req, res, next) => {
    const sqlData = `select * from data`;
    pool.query(sqlData, (err, data) => {
      if (err) res.status(500).send(err);
      let result = data.rows.map(item => {
        item.date = moment(item.date).format('LL')
        return item
      })
      res.status(200).json({
        result
      })
    })
  });
  return router;
};