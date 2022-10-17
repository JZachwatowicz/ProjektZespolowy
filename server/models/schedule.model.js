module.exports = (sequelize, Sequelize) => {
    const Schedule = sequelize.define("schedules", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }
    });
  
    return Schedule;
  };