module.exports = (sequelize, Sequelize) => {
  const Note = sequelize.define('notes', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    note: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
  });

  return Note;
};
