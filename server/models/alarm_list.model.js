module.exports = (sequelize, Sequelize) => {
  const AlarmList = sequelize.define('alarm_list', {
    engineId: {
      type: Sequelize.INTEGER,
    },
    dataPoint: {
      type: Sequelize.STRING,
    },
    value: {
      type: Sequelize.JSON,
    },
  });

  return AlarmList;
};
