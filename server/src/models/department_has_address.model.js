module.exports = (sequelize, Sequelize) => {
    const DepartmentAddress = sequelize.define("deparment_has_address", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }
    });
  
    return DepartmentAddress;
  };