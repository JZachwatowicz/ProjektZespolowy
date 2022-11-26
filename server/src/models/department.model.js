module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define("deparments", {
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
      description: {
        type:  Sequelize.STRING(250),
        allowNull: false
      }
    });
  
    return Department;
  };