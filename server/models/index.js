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

// connecting models

db.refresh_token = require('./refresh_token.model.js')(sequelize, Sequelize);

db.activity = require('./activity.model.js')(sequelize, Sequelize);
db.address = require('./address.model.js')(sequelize, Sequelize);
db.city = require('./city.model.js')(sequelize, Sequelize);
db.client_description = require('./client_description.model.js')(sequelize, Sequelize);
db.client_has_schedule = require('./client_has_schedule.model.js')(sequelize, Sequelize);
db.client = require('./client.model.js')(sequelize, Sequelize);
db.country = require('./country.model.js')(sequelize, Sequelize);
db.department_has_address = require('./department_has_address.model.js')(sequelize, Sequelize);
db.department = require('./department.model.js')(sequelize, Sequelize);
db.employee_has_schedule = require('./employee_has_schedule.model.js')(sequelize, Sequelize);
db.employee_type = require('./employee_type.model.js')(sequelize, Sequelize);
db.employee = require('./employee.model.js')(sequelize, Sequelize);
db.harmonogram = require('./harmonogram.model.js')(sequelize, Sequelize);
db.item_type = require('./item_type.model.js')(sequelize, Sequelize);
db.item = require('./item.model.js')(sequelize, Sequelize);
db.room_type = require('./room_type.model.js')(sequelize, Sequelize);
db.room = require('./room.model.js')(sequelize, Sequelize);
db.schedule = require('./schedule.model.js')(sequelize, Sequelize);
db.street = require('./street.model.js')(sequelize, Sequelize);
db.user = require('./user.model.js')(sequelize, Sequelize);
db.voivodeship = require('./voivodeship.model.js')(sequelize, Sequelize);


// creating associations

db.country.hasMany(db.voivodeship, {
    foreignKey: {
        name: 'country_id',
        allowNull: false
    },
    as: 'voivodeship'
});
db.voivodeship.belongsTo(db.country, {
    foreignKey: {
        name: 'country_id',
        allowNull: false
    },
    as: 'country'
});

db.voivodeship.hasMany(db.city, {as: 'city'});
db.city.belongsTo(db.voivodeship, {
    foreignKey: {
        name: 'voivodeship_id',
        allowNull: false
    },
    as: 'voivodeship'
});

db.city.hasMany(db.street, {as: 'street'});
db.street.belongsTo(db.city, {
    foreignKey: {
        name: 'city_id',
        allowNull: false
    },
    as: 'city'
});

db.street.hasMany(db.address, {as: 'address'});
db.address.belongsTo(db.street, {
    foreignKey: {
        name: 'street_id',
        allowNull: false
    },
    as: 'street'
});

db.address.hasMany(db.user, {as: 'user'});
db.user.belongsTo(db.address, {
    foreignKey: {
        name: 'address_id',
        allowNull: false
    },
    as: 'address'
});

db.address.hasMany(db.department_has_address, {as: 'department_has_address'})
db.department_has_address.belongsTo(db.address, {
    foreignKey: {
        name: 'address_id',
        allowNull: false
    },
    as: 'address'
});

db.department.hasMany(db.department_has_address, {as: 'department_has_address'})
db.department_has_address.belongsTo(db.department, {
    foreignKey: {
        name: 'department_id',
        allowNull: false
    },
    as: 'department'
});

db.department_has_address.hasMany(db.room, {as: 'room'});
db.room.belongsTo(db.department_has_address, {
    foreignKey: {
        name: 'department_has_address_id',
        allowNull: false
    },
    as: 'department_has_address'
});

db.room_type.hasMany(db.room, {as: 'room'});
db.room.belongsTo(db.room_type, {
    foreignKey: {
        name: 'room_type_id',
        allowNull: false
    },
    as: 'room_type'
});

db.room.hasMany(db.harmonogram, {as: 'harmonogram'});
db.harmonogram.belongsTo(db.room, {
    foreignKey: {
        name: 'room_id',
        allowNull: true
    },
    as: 'room'
});

db.item.hasMany(db.harmonogram, {as: 'harmonogram'});
db.harmonogram.belongsTo(db.item, {
    foreignKey: {
        name: 'item_id',
        allowNull: true
    },
    as: 'item'
});

db.item_type.hasMany(db.item, {as: 'item'});
db.item.belongsTo(db.item_type, {
    foreignKey: {
        name: 'item_type_id',
        allowNull: false
    },
    as: 'item_type'
});



db.refresh_token.belongsTo(db.user, {
    foreignKey: 'user_id', targetKey: 'id'
});
db.user.hasOne(db.refresh_token, {
    foreignKey: 'user_id', targetKey: 'id'
});



/*
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
*/

db.sequelize.sync()
    .then(() => {
        console.log('yes re-sync done!');
        //init_roles();
    })

//db.ROLES = ["user", "employee", "admin"];
module.exports = db
