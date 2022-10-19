module.exports = (sequelize, Sequelize) => {
    const Activity = sequelize.define("activities", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(250),
        allowNull: false
      }
    });
  
    return Activity;
  };