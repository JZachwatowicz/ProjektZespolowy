module.exports = (sequelize, Sequelize) => {
    const UserScheudle = sequelize.define("user_has_schedule", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }
    });
  
    return UserScheudle;
  };