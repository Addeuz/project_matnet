module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define('clients', {
    clientName: {
      type: Sequelize.STRING,
    },
    contactName: {
      type: Sequelize.STRING,
    },
    phoneNumber: {
      type: Sequelize.STRING,
    },
  });

  return Client;
};
