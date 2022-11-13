module.exports = (sequelize, Sequelize) => {
    const Harmonogram = sequelize.define("harmonograms", {
      begin_date: {
        type: Sequelize.DATE,
        allowNull:false
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      admin_consent: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
        allowNull: false
      }
    });
  
    return Harmonogram;
  };