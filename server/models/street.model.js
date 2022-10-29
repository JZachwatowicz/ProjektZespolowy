module.exports = (sequelize, Sequelize) => {
    const Street = sequelize.define("streets", {
        name: {
            type: Sequelize.STRING(45),
            unique: true,
            allowNull: false
        }
    });

    return Street;
};