module.exports = (sequelize, Sequelize) => {
    const Street = sequelize.define("streets", {
        name: {
            type: Sequelize.STRING(45),
            allowNull: false
        }
    });

    return Street;
};