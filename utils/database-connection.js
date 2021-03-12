const mysql = require('mysql2/promise');
const config = require('../dbConfig');

const pool = mysql.createPool((config));
module.exports = pool;
