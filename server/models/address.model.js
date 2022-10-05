module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define("addresses", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      building_number: Sequelize.STRING(5),
      apartment_number: Sequelize.STRING(5)
    },
    {
        indexes: [
          {
            allowNull: false,
            fields: ['building_number']
          }
        ]
      });
  
    return Address;
  };