module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define("countries", {
        name: {
            type: Sequelize.STRING(45),
            unique: 'country_name',
            allowNull: false
        },
        code: {
            type: Sequelize.STRING(5),
            unique: 'country_id',
            allowNull: false
        }
    });

    return Country;
};
