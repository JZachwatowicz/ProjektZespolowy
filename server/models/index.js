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
db.user = require('./userModel.js')(sequelize, Sequelize)
db.role = require('./roleModel.js')(sequelize, Sequelize)
db.refreshToken = require("../models/refreshTokenModel.js")(sequelize, Sequelize);



// 1 to Many Relation

db.products.hasMany(db.reviews, {
    foreignKey: 'product_id',
    as: 'review'
})

db.reviews.belongsTo(db.products, {
    foreignKey: 'product_id',
    as: 'product'
})

//many to many relation
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.refreshToken.belongsTo(db.user, {
    foreignKey: 'userId', targetKey: 'id'
});
db.user.hasOne(db.refreshToken, {
    foreignKey: 'userId', targetKey: 'id'
});

// INSERT INTO roles VALUES (1, 'user', now(), now());
// INSERT INTO roles VALUES (2, 'employee', now(), now());
// INSERT INTO roles VALUES (3, 'admin', now(), now());
function init_roles() {
    db.role.create({
        name: "user"
    });

    db.role.create({
        name: "employee"
    });

    db.role.create({
        name: "admin"
    });
}

db.sequelize.sync()
    .then(() => {
        console.log('yes re-sync done!');
        //init_roles();
    })

db.ROLES = ["user", "employee", "admin"];
module.exports = db
