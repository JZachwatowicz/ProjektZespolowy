module.exports = (sequelize, Sequelize) => {
    const EmployeeType = sequelize.define("employee_types", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: Sequelize.STRING(45),
    },
    {
      indexes: [
        {
          unique: true,
          fields:['name']
        },
        {
          allowNull: false,
          fields:['name']
        }
      ]
    });
  
    return EmployeeType;
  };