module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define("countries", {
        name: {
            type: Sequelize.STRING(45),
            unique: true,
            allowNull: false
        },
        code: {
            type: Sequelize.STRING(5),
            unique: true,
            allowNull: false
        }
    });

    return Country;
};
