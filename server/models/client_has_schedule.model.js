module.exports = (sequelize, Sequelize) => {
    const ClientScheudle = sequelize.define("client_has_schedule", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }
    });
  
    return ClientScheudle;
  };