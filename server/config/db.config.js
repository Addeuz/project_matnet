module.exports = {
  host: 'localhost',
  user: 'root',
  password: 'caroandr97',
  db: 'test-matnet',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
