// mysql://[username]:[password]@[host]/[database name]?reconnect=true
const dbUri =  process.env.CLEARDB_DATABASE_URL;
const credentials = dbUri.split(":");
const user = credentials[0];
const password = credentials[1];
const host = credentials[2];
const dbName = credentials[3];

const db = {
    host: host || 'localhost',
        user: user || 'root',
    password: password || 'test',
    database: dbName ||'Cookbook'
}

module.exports = db;
