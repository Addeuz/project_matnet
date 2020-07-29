module.exports = (sequelize, Sequelize) => {
  const Engine = sequelize.define('engine', {
    tag_nr: {
      type: Sequelize.STRING,
    },
    art_nr: {
      type: Sequelize.STRING,
    },
    position: {
      type: Sequelize.STRING,
    },
    diverse: {
      type: Sequelize.STRING,
    },
    fabrikat: {
      type: Sequelize.STRING,
    },
    typ: {
      type: Sequelize.STRING,
    },
    motor_nr: {
      type: Sequelize.STRING,
    },
    varvtal: {
      type: Sequelize.STRING,
    },
    frekvens: {
      type: Sequelize.STRING,
    },
    effekt: {
      type: Sequelize.STRING,
    },
    spanning: {
      type: Sequelize.STRING,
    },
    strom: {
      type: Sequelize.STRING,
    },
    sekundar_v: {
      type: Sequelize.STRING,
    },
    sekundar_a: {
      type: Sequelize.STRING,
    },
    lager_isolerad: {
      type: Sequelize.BOOLEAN,
    },
    lager_de: {
      type: Sequelize.STRING,
    },
    lager_nde: {
      type: Sequelize.STRING,
    },
    kolborstar: {
      type: Sequelize.STRING,
    },
    fri_text: {
      type: Sequelize.STRING,
    },
  });

  return Engine;
};
