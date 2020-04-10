const mysql = require('mysql2');

const databasePool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'buyermanager'
})

module.exports = databasePool.promise();