module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("articles", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      creation_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      edition_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
      }
    });
  
    return Article;
  };