const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, 'public', 'admin', 'sql-files' , 'ecommerce.db');
const db = new Database(dbPath, { verbose: console.log });

module.exports = db;