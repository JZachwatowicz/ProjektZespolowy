module.exports = (sequelize, Sequelize) => {
    const Harmonogram = sequelize.define("harmonograms", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      begin_date: Sequelize.DATE,
      end_date: Sequelize.DATE,
      admin_consent: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      }
    },
    {
        indexes: [
          {
            allowNull: false,
            fields: ['begin_date', 'end_date', 'admin_consent']
          }
        ]
      });
  
    return Harmonogram;
  };