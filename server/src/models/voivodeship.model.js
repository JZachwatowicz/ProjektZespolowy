module.exports = (sequelize, Sequelize) => {
    const Voivodeship = sequelize.define("voivodeships", {
        name: {
            type: Sequelize.STRING(45),
            unique: "voivodeship_name",
            allowNull: false
        }
    });

    return Voivodeship;
};
