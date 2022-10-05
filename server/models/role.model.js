module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
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
          primaryKey: true,
          fields: ['id']
        },
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
  
    return Role;
  };