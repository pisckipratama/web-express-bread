const moment = require('moment');
moment.locale('id');

let day = moment('01/02/2020').format('YYYY');
console.log(day)