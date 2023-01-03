module.exports = (sequelize, Sequelize) => {
    const UserSchedule = sequelize.define("user_has_schedule", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }
    });
  
    return UserSchedule;
  };