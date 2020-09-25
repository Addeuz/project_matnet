module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    username: {
      type: Sequelize.STRING,
    },
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    motormon: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    baker: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    meggningstator: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    meggningrotor: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    driftström: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    lindtemp: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    vibration: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    smörjning: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    okulärintern: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    okulärextern: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    manteltemp: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    släpringsyta: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    lagerkondde: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    lagerkondnde: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    spmde: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    spmnde: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    lagertempde: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    lagertempnde: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    lagerisolering: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    renhet: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    kylpaket: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    kolborstar: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    varvtalsgivare: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    'tan-delta': {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    'pol-index': {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    kommutatoryta: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    kollektortemp: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    driftservice: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    stoppservice: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

  return User;
};
