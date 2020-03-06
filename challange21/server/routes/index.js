let express = require('express');
let router = express.Router();
let moment = require('moment');

moment.locale('id')
/* GET home page. */

module.exports = (pool) => {
  router.get('/', (req, res, next) => {
    let sqlData = `select * from data`;

    // pagination logic
    const limit = 5;
    const currentPage = parseInt(req.query.page) || 1;
    const offset = parseInt(currentPage - 1) * limit;

    // === start logic for filtering ===
    let queries = req.query;
    let result = [];
    let forDate = {};

    if (queries.checkID === 'on') {
      result.push(`id=${queries.inputID}`);
    }
    if (queries.checkString === 'on') {
      result.push(`string='${queries.inputString}'`);
    }
    if (queries.checkInteger === 'on') {
      result.push(`integer=${queries.inputInteger}`);
    }
    if (queries.checkFloat === 'on') {
      result.push(`float='${queries.inputFloat}'`);
    }
    if (queries.checkBoolean === 'on') {
      result.push(`boolean=${queries.inputBoolean === 'true' ? '1' : '0'}`)
    }
    if (queries.checkDate === 'on') {
      forDate.startDate = queries.startDate;
      forDate.endDate = queries.endDate;
    }

    if (result.length > 0) {
      sqlData += ' where ';
      if (result.length > 1) {
        for (let i = 0; i < result.length; i++) {
          sqlData += result[i] + ' and ';
        }
        sqlData = sqlData.slice(-(Math.abs(sqlData.length)), -4);
      } else {
        for (let i = 0; i < result.length; i++) {
          sqlData += result[i] + ' ';
        }
      }
    }

    if (forDate.hasOwnProperty('startDate')) {
      if (sqlData === 'select * from data') {
        sqlData = `select * from data where date between '${forDate.startDate}' and '${forDate.endDate}'`;
      } else {
        sqlData += `and date between '${forDate.startDate}' and '${forDate.endDate}' `;
      }
    }

    sqlData += ' order by id desc';
    console.log(sqlData);

    pool.query(sqlData, (err, data) => {
      if (err) res.status(500).send(err);

      const totalRows = data.rows.length === undefined ? 0 : data.rows.length;
      const totalPage = Math.ceil(totalRows / limit)
      const url = req.url == '/' ? '/?page=1' : req.url;

      sqlData += ` limit ${limit} offset ${offset}`;

      pool.query(sqlData, (err, data) => {
        if (err) res.status(500).send(err);
        let result = data.rows.map(item => {
          item.string = item.string ? item.string : 'kosong'
          item.integer = item.integer ? item.integer : 'kosong'
          item.date = moment(item.date).format('LL') == 'Invalid date' ? 'kosong' : moment(item.date).format('LL');
          item.boolean = item.boolean ? true : false;
          return item
        })
        res.status(200).json({
          result,
          url,
          offset,
          totalPage,
          currentPage,
          query: req.query
        })
      })
    })
  });

  router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    const sqlData = `select * from data where id=${id} order by id`;
    pool.query(sqlData, (err, data) => {
      if (err) res.status(500).send(err);
      let result = data.rows.map(item => {
        return item
      })
      res.status(200).json({
        result
      })
    })
  });

  router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const {
      string,
      integer,
      float,
      date
    } = req.body;
    const boolean = req.body.boolean == 'true' ? 1 : 0;
    const sqlEdit = `update data set string='${string}', integer=${integer}, float=${float}, date='${date}', boolean=${boolean} where id=${id}`;
    console.log(sqlEdit);
    pool.query(sqlEdit, (err, data) => {
      if (err) res.status(500).send(err);
      res.status(201).json({
        string: string,
        integer: integer,
        float: float,
        date: date,
        boolean: boolean ? 'true' : 'false'
      })
    })
  })

  router.post('/', (req, res, next) => {
    const {
      string,
      integer,
      float,
      date
    } = req.body;
    const boolean = req.body.boolean == 'true' ? 1 : 0;
    const sqlAdd = `insert into data (string, integer, float, date, boolean) values('${string}', ${integer}, ${float}, '${date}', ${boolean})`;
    pool.query(sqlAdd, (err, data) => {
      if (err) res.status(500).send(err);
      res.status(201).json({
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
      res.status(201).json({
        id: id
      })
    })
  })

  return router;
};