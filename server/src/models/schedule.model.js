module.exports = (sequelize, Sequelize) => {
    const Schedule = sequelize.define("schedules");
  
    return Schedule;
  };