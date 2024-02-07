const mysql = require('mysql2');
require('dotenv').config()

const dbConfig = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};

const pool = mysql.createPool(dbConfig);

module.exports = pool