module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define("countries", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: Sequelize.STRING(45),
      code: Sequelize.STRING(5)
    },
    {
        indexes: [
          {
            unique: true,
            fields: ['name', 'code']
          },
          {
            allowNull: false,
            fields: ['name', 'code']
          }
        ]
      });
  
    return Country;
  };