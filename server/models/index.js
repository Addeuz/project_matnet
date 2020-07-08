const Sequelize = require('sequelize');
// const config = require('../config/db.config');
const {
  host,
  user,
  password,
  database,
  dialect,
  pool,
} = require('../config/env.config');

// Connecting to twhe database with Sequelize ORM
const sequelize = new Sequelize(database, user, password, {
  host,
  dialect,
  pool,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model')(sequelize, Sequelize);
db.role = require('./role.model')(sequelize, Sequelize);
db.client = require('./client.model')(sequelize, Sequelize);

// Defines many to many relationship between users and roles.
// The connection will be done in a new table called 'user_roles'
// With appropriate foreignKey's
db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherkey: 'userId',
});

db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
});

db.client.belongsToMany(db.user, {
  through: 'client_users',
  foreignKey: 'clientId',
  otherKey: 'userId',
});

db.user.belongsToMany(db.client, {
  through: 'client_users',
  foreignKey: 'userId',
  otherKey: 'clientId',
});

db.ROLES = ['kund', 'admin', 'moderator'];

module.exports = db;
