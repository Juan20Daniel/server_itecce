const mysql = require('mysql2');

const pool = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'password',
  database:'itecce'
})
pool.query('SELECT 1 + 1', (err, rows) => {
  if(err) {
    console.log(err);
  } else {
    console.log("THE DATABASE HAS BEEN CONECTED");
  }
})

module.exports = pool;