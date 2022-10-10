module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING(15),
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      first_name: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      birth_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      pesel: {
        type: Sequelize.STRING(11),
        unique: true,
        allowNull: false
      },
      contact_number: {
        type: Sequelize.STRING(9),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return User;
};