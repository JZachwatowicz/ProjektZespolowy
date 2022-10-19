module.exports = (sequelize, Sequelize) => {
    const City = sequelize.define("cities", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true
      }
    });
  
    return City;
  };