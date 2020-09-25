module.exports = (sequelize, Sequelize) => {
  const LimitValues = sequelize.define('limit_values', {
    motormon: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    baker: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    meggningstator: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    meggningrotor: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    driftström: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    lindtemp: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    vibration: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    smörjning: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    okulärintern: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    okulärextern: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    manteltemp: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    släpringsyta: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    lagerkondde: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    lagerkondnde: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    spmde: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    spmnde: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    lagertempde: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    lagertempnde: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    lagerisolering: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    renhet: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    kylpaket: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    kolborstar: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    varvtalsgivare: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    'tan-delta': {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    'pol-index': {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    kommutatoryta: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    kollektortemp: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    driftservice: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
    stoppservice: {
      type: Sequelize.JSON,
      defaultValue: { limit: [1, 3], default: true },
    },
  });

  return LimitValues;
};
