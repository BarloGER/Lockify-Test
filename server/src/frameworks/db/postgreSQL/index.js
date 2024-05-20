const pg = require("pg");

const Pool = pg.Pool;

exports.pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
