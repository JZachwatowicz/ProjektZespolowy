const dbConfig = require('../configs/db.config.js')

const { Sequelize } = require('sequelize')

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


// connecting models

db.products = require('./productModel.js')(sequelize, Sequelize)
db.reviews = require('./reviewModel.js')(sequelize, Sequelize)
db.user = require('./user.model.js')(sequelize, Sequelize)
db.role = require('./role.model.js')(sequelize, Sequelize)
db.address = require('./address.model.js')(sequelize, Sequelize)
db.street = require('./street.model.js')(sequelize, Sequelize)
db.city = require('./city.model.js')(sequelize, Sequelize)
db.voivodeship = require('./voivodeship.model.js')(sequelize, Sequelize)
db.country = require('./country.model.js')(sequelize, Sequelize)
db.refreshToken = require("./refresh-token.model.js")(sequelize, Sequelize)
db.activity = require('./activity.model.js')(sequelize, Sequelize)
db.article = require('./article.model.js')(sequelize, Sequelize)

// creating associations

db.products.hasMany(db.reviews, {
    foreignKey: 'product_id',
    as: 'review'
})

db.reviews.belongsTo(db.products, {
    foreignKey: 'product_id',
    as: 'product'
})

db.role.hasMany(db.user, {
    foreignKey: 'role_id',
})
db.user.belongsTo(db.role, {
    foreignKey: 'role_id',
})

db.refreshToken.belongsTo(db.user, {
    foreignKey: 'user_id', targetKey: 'id'
})
db.user.hasOne(db.refreshToken, {
    foreignKey: 'user_id', targetKey: 'id'
})

db.address.hasMany(db.user, {
    foreignKey: 'address_id',
})
db.user.belongsTo(db.address, {
    foreignKey: 'address_id',
})

db.street.hasMany(db.address, {
    foreignKey: 'street_id',
})
db.address.belongsTo(db.street, {
    foreignKey: 'street_id',
})

db.city.hasMany(db.street, {
    foreignKey: 'city_id',
})
db.street.belongsTo(db.city, {
    foreignKey: 'city_id',
})

db.voivodeship.hasMany(db.city, {
    foreignKey: 'voivodeship_id',
})
db.city.belongsTo(db.voivodeship, {
    foreignKey: 'voivodeship_id',
})

db.country.hasMany(db.voivodeship, {
    foreignKey: 'country_id',
})
db.voivodeship.belongsTo(db.country, {
    foreignKey: 'country_id',
})

//alter:true force:false - nie wymazuj wszystkich danych ale stwórz na nowo tabele
//force:true - wymaż wszystko i stwórz na nowo
db.sequelize.sync({
    alter: true,
    force: false
})
    .then(() => {
        console.log('yes re-sync done!');
    })

db.ROLES = ["user", "employee", "admin"];
module.exports = db
