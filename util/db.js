// const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'nodejs_course',
//   password: '13562347',
// });

// module.exports = pool.promise();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs_course', 'root', '13562347', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
