module.exports = (sequelize, Sequelize) => {
    const Voivodeship = sequelize.define("voivodeships", {
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

    return Voivodeship;
};