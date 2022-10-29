module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define("addresses", {
        building_number: {
            type: Sequelize.STRING(5),
            allowNull: false
        },
        apartment_number: Sequelize.STRING(5)
    });

    return Address;
};