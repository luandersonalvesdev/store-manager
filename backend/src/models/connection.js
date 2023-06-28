const mysql2 = require('mysql2/promise');

const connection = mysql2.createPool({
  host: process.env.MYSQL_HOSTNAME || 'store_manager_db',
  port: process.env.MYSQL_PORT || '3306',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'StoreManager',
  user: process.env.MYSQL_USER || 'root',
});

module.exports = connection;