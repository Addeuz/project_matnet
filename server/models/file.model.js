module.exports = (sequelize, Sequelize) => {
  const File = sequelize.define('files', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    baseUrl: {
      type: Sequelize.TEXT('long'),
    },
    mimeType: {
      type: Sequelize.STRING,
    },
    extension: {
      type: Sequelize.STRING,
    },
  });

  return File;
};
