module.exports = (sequelize, Sequelize) => {
    const Street = sequelize.define("streets", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(45),
        unique: true,
        allowNull: false
      }
    });
  
    return Street;
  };