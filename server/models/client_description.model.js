module.exports = (sequelize, Sequelize) => {
    const ClientDescription = sequelize.define("client_descriptions", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: Sequelize.STRING(100),
      description: Sequelize.TEXT,
      author: Sequelize.VARCHAR(100),
      date: Sequelize.DATEONLY
    },
    {
        indexes: [
          {
            allowNull: false,
            fields: ['title', 'description', 'author', 'date']
          }
        ]
      });
  
    return ClientDescription;
  };