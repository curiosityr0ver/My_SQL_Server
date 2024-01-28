const mysql = require('mysql2');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'hiranmayee'
};

const pool = mysql.createConnection(dbConfig);

module.exports = pool