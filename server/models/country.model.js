module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define("countries", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(45),
        unique: true,
        allowNull: false
      },
      code: {
        type: Sequelize.STRING(5),
        unique: true,
        allowNull: false
      }
    });
  
    return Country;
  };