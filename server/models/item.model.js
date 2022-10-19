module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("items", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      serial_number: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      possesion_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      }
    });
  
    return Item;
  };