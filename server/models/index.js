const dbConfig = require('../config/db.config.js');

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle

    }
}
)

sequelize.authenticate()
    .then(() => {
        console.log('connected..')
    })
    .catch(err => {
        console.log('Error' + err)
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require('./productModel.js')(sequelize, Sequelize)
db.reviews = require('./reviewModel.js')(sequelize, Sequelize)
db.user = require('./user.model.js')(sequelize, Sequelize)
db.role = require('./role.model.js')(sequelize, Sequelize)
db.refreshToken = require("./refresh-token.model.js")(sequelize, Sequelize);



// 1 to Many Relation example

db.products.hasMany(db.reviews, {
    foreignKey: 'product_id',
    as: 'review'
})

db.reviews.belongsTo(db.products, {
    foreignKey: 'product_id',
    as: 'product'
})

db.role.hasMany(db.user,{
    foreignKey: 'role_id',
    as: 'user'
});
db.user.belongsTo(db.role,{
    foreignKey: 'role_id',
    as: 'role'
})

db.refreshToken.belongsTo(db.user, {
    foreignKey: 'user_id', targetKey: 'id'
});
db.user.hasOne(db.refreshToken, {
    foreignKey: 'user_id', targetKey: 'id'
});


db.sequelize.sync()
    .then(() => {
        console.log('yes re-sync done!');
    })

db.ROLES = ["user", "employee", "admin"];
module.exports = db
