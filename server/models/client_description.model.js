module.exports = (sequelize, Sequelize) => {
    const ClientDescription = sequelize.define("client_descriptions", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
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
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      }
    });
  
    return ClientDescription;
  };