module.exports = (sequelize, Sequelize) => {
    const Activity = sequelize.define("activities", {
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