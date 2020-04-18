var Database = require('arangojs');
var db = new Database('http://127.0.0.1:8529');

module.exports = {
  getAllUsers: () => {
    return db.database('bread')
      .then(mydb => mydb.query('FOR x IN User RETURN x'))
      .then(cursor => cursor.all())
  }
};