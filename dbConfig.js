testUrl = '// mysql://[username]:[password]@[host]/[database name]?reconnect=true'
const dbUri =  process.env.CLEARDB_DATABASE_URL || testUrl;
const credentials = dbUri.split(":");
const user = credentials[1].substring(2);
const password = credentials[2].substring(0, credentials[2].indexOf('@'));
const host = credentials[2].substring(credentials[2].indexOf('@')+1, credentials[2].indexOf('/'));
const dbName = credentials[2].substring(credentials[2].indexOf('/')+1, credentials[2].indexOf('?'));

const db = {
    host: host || 'localhost',
        user: user || 'root',
    password: password || 'test',
    database: dbName ||'Cookbook'
}

module.exports = db;
