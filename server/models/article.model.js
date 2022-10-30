module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("articles", {
      title: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    });
  
    return Article;
  };