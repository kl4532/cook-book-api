const mysql = require('mysql2');
const config = require('../dbConfig');

const db = mysql.createConnection(config);

// Connect to db
db.connect((err) => {
    if(err) {
        console.error('Could not connect to database...');
        throw err;
    }
    console.log(`Connected to ${config.database}`);
});

module.exports = db;
