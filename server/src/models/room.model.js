module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("rooms", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(45),
        unique: 'room_name',
        allowNull: false
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  
    return Room;
  };