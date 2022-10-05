module.exports = (sequelize, Sequelize) => {
    const ItemType = sequelize.define("item_types", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: Sequelize.STRING(45),
      capacity: Sequelize.INTEGER
    },
    {
      indexes: [
        {
          unique: true,
          fields:['name']
        },
        {
          allowNull: false,
          fields:['name', 'capacity']
        }
      ]
    });
  
    return ItemType;
  };