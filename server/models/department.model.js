module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define("deparments", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: Sequelize.STRING(45),
      description: Sequelize.INTEGER
    },
    {
      indexes: [
        {
          unique: true,
          fields:['name']
        },
        {
          allowNull: false,
          fields:['name', 'description']
        }
      ]
    });
  
    return Department;
  };