let express = require('express');
let router = express.Router();
let moment = require('moment');

moment.locale('id')
/* GET home page. */

module.exports = (pool) => {
  router.get('/', (req, res, next) => {
    const sqlData = `select * from data order by id`;
    pool.query(sqlData, (err, data) => {
      if (err) res.status(500).send(err);
      let result = data.rows.map(item => {
        item.date = moment(item.date).format('LL');
        item.boolean = item.boolean ? true : false;
        return item
      })
      res.status(200).json({
        result
      })
    })
  });

  router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const { string, integer, float, date } = req.body;
    const boolean = req.body.boolean == 'true' ? 1 : 0;
    const sqlEdit = `update data set string='${string}', integer=${integer}, float=${float}, date='${date}', boolean=${boolean} where id=${id}`;
    pool.query(sqlEdit, (err, data) => {
      if(err) res.status(500).send(err);
      res.status(200).json({
        string: string,
        integer: integer,
        float: float,
        date: date,
        boolean: boolean ? 'true' : 'false'
      })
    })
  })

  router.post('/', (req, res, next) => {
    const { string, integer, float, date } = req.body;
    const boolean = req.body.boolean == 'true' ? 1 : 0;
    const sqlAdd = `insert into data (string, integer, float, date, boolean) values('${string}', ${integer}, ${float}, '${date}', ${boolean})`;
    pool.query(sqlAdd, (err, data) => {
      if (err) res.status(500).send(err);
      res.status(200).json({
        string: string,
        integer: integer,
        float: float,
        date: date,
        boolean: req.body.boolean
      })
    })
  })

  router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    const sqlDel = `delete from data where id=${id}`
    pool.query(sqlDel, (err, data) => {
      if (err) res.status(500).send(err);
      res.status(200).json({
        id: id
      }) 
    })
  })

  return router;
};