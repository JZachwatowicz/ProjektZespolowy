module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("clients", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }
    });
  
    return Client;
  };