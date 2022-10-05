module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employees", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }
    });
  
    return Employee;
  };