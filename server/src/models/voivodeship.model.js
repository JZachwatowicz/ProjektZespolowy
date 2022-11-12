module.exports = (sequelize, Sequelize) => {
    const Voivodeship = sequelize.define("voivodeships", {
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
  
    return Voivodeship;
  };