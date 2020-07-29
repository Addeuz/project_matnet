module.exports = (sequelize, Sequelize) => {
  const EngineValues = sequelize.define('engine_values', {
    type: {
      type: Sequelize.STRING,
    },
    engine_values: {
      type: Sequelize.JSON,
    },
  });

  return EngineValues;
};
