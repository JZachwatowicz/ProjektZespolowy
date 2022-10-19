module.exports = (sequelize, Sequelize) => {
    const UserType = sequelize.define("user_types", {
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
  
    return UserType;
  };