module.exports = (sequelize, Sequelize) => {
    const Voivodeship = sequelize.define("voivodeships", {
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
  
    return Voivodeship;
  };