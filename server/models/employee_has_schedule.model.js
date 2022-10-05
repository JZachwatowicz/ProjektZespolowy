module.exports = (sequelize, Sequelize) => {
    const EmployeeScheudle = sequelize.define("employee_has_schedule", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }
    });
  
    return EmployeeScheudle;
  };