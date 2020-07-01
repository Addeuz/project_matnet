const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB,
  dialect: process.env.DIALECT,
  pool: process.env.POOL,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
};
