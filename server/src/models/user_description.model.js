module.exports = (sequelize, Sequelize) => {
    const UserDescription = sequelize.define("user_descriptions", {
      title: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      author: {
        type: Sequelize.STRING(100),
        allowNull: false
      }
    });
  
    return UserDescription;
  };