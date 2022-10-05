module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("items", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: Sequelize.STRING(45),
      serial_number: Sequelize.STRING(45),
      possesion_date: Sequelize.DATEONLY
    },
    {
        indexes: [
          {
            allowNull: false,
            fields: ['name', 'serial_number', 'possesion_date']
          }
        ]
      });
  
    return Item;
  };