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
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  
    return Department;
  };