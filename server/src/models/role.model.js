module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("roles", {
    name: {
      type: Sequelize.STRING(45),
      unique: true,
      allowNull: false
    }
  });

  return Role;
};