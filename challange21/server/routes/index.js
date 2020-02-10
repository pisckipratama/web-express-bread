let express = require('express');
let router = express.Router();

/* GET home page. */

module.exports = (pool) => {
  router.get('/', (req, res, next) => {
    const sqlData = `select * from data`;
    pool.query(sqlData, (err, data) => {
      let result = data.rows;
      if (err) res.status(500).send(err);
      res.status(200).json({
        result
      })
    })
  });
  return router;
};