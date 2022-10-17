module.exports = (sequelize, Sequelize) => {
    const ItemType = sequelize.define("item_types", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(45),
        unique: true,
        allowNull: false
      }
    });
  
    return ItemType;
  };