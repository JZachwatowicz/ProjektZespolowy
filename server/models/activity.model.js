module.exports = (sequelize, Sequelize) => {
    const Activity = sequelize.define("activities", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: Sequelize.STRING(100),
      description: Sequelize.STRING(250)
    },
    {
        indexes: [
          {
            allowNull: false,
            fields: ['name', 'description']
          }
        ]
      });
  
    return Activity;
  };