const { Pool } = require('pg');
const dbConfig = require('./secrets/databaseConfig');

const pool = new Pool(dbConfig);

module.exports = pool;
