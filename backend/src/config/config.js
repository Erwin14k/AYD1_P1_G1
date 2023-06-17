const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  server: {
    port: process.env.PORT,
  },
  mysqlConfig: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    connectionLimit: 10,
  },
};
