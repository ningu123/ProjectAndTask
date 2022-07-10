var dbConfig = require("../config/appConfig.json");
const { Pool } = require("pg");

const pool = new Pool({
  user: dbConfig.db_postgres.user,
  host: dbConfig.db_postgres.host,
  database: dbConfig.db_postgres.database,
  password: dbConfig.db_postgres.password,
  port: dbConfig.db_postgres.port
});




pool.on("error", (err, client) => {
  console.log("error occured")
})

module.exports = pool;
