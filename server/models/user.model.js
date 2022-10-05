module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: Sequelize.STRING(15),
      password: Sequelize.STRING(20),
      first_name: Sequelize.STRING(45),
      last_name: Sequelize.STRING(45),
      birth_date: Sequelize.DATEONLY,
      pesel: Sequelize.STRING(11),
      contact_number: Sequelize.STRING(9),
      email: Sequelize.STRING
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['username', 'pesel']
        },
        {
          allowNull: false,
          fields:
          [
            'username',
            'password',
            'first_name',
            'last_name',
            'birth_date',
            'pesel',
            'contact_number',
            'email'
          ]
        }
      ]
    });
  
    return User;
  };