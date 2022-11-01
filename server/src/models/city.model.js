module.exports = (sequelize, Sequelize) => {
    const City = sequelize.define("cities", {
        name: {
            type: Sequelize.STRING(45),
            allowNull: false
        }
    });

    return City;
};