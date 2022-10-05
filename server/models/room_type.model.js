module.exports = (sequelize, Sequelize) => {
    const RoomType = sequelize.define("room_types", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: Sequelize.STRING(45)
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
  
    return RoomType;
  };