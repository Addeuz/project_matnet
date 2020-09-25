module.exports = (sequelize, Sequelize) => {
  const Engine = sequelize.define('engine', {
    engineInfo: {
      type: Sequelize.JSON,
    },
    motormon: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    baker: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    meggningstator: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    meggningrotor: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    driftström: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    lindtemp: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    vibration: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    smörjning: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    okulärintern: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    okulärextern: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    manteltemp: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    släpringsyta: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    lagerkondde: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    lagerkondnde: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    spmde: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    spmnde: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    lagertempde: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    lagertempnde: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    lagerisolering: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    renhet: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    kylpaket: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    kolborstar: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    varvtalsgivare: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    'tan-delta': {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    'pol-index': {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    kommutatoryta: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    kollektortemp: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    driftservice: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
    stoppservice: {
      type: Sequelize.JSON,
      defaultValue: { values: [] },
    },
  });

  return Engine;
};
