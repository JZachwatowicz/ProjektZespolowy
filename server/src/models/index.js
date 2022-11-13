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


db.user = require('./user.model.js')(sequelize, Sequelize)
db.role = require('./role.model.js')(sequelize, Sequelize)
db.address = require('./address.model.js')(sequelize, Sequelize)
db.street = require('./street.model.js')(sequelize, Sequelize)
db.city = require('./city.model.js')(sequelize, Sequelize)
db.voivodeship = require('./voivodeship.model.js')(sequelize, Sequelize)
db.country = require('./country.model.js')(sequelize, Sequelize)
db.refreshToken = require("./refresh-token.model.js")(sequelize, Sequelize)
db.activity = require('./activity.model.js')(sequelize, Sequelize);
db.article = require('./article.model.js')(sequelize, Sequelize);
db.department_has_address = require('./department_has_address.model.js')(sequelize, Sequelize);
db.department = require('./department.model.js')(sequelize, Sequelize);
db.harmonogram = require('./harmonogram.model.js')(sequelize, Sequelize);
db.item_type = require('./item_type.model.js')(sequelize, Sequelize);
db.item = require('./item.model.js')(sequelize, Sequelize);
db.room_type = require('./room_type.model.js')(sequelize, Sequelize);
db.room = require('./room.model.js')(sequelize, Sequelize);
db.schedule = require('./schedule.model.js')(sequelize, Sequelize);
db.user_description = require('./user_description.model.js')(sequelize, Sequelize);



// creating associations


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

db.address.hasMany(db.department_has_address, {
    foreignKey: {
        name: 'address_id',
        allowNull: false
    },
    as: 'department_has_address'
})
db.department_has_address.belongsTo(db.address, {
    foreignKey: {
        name: 'address_id',
        allowNull: false
    },
    as: 'address'
});

db.department.hasMany(db.department_has_address, {
    foreignKey: {
        name: 'department_id',
        allowNull: false
    },
    as: 'department_has_address'
})
db.department_has_address.belongsTo(db.department, {
    foreignKey: {
        name: 'department_id',
        allowNull: false
    },
    as: 'department'
});

db.department_has_address.hasMany(db.room, {
    foreignKey: {
        name: 'department_has_address_id',
        allowNull: false
    },
    as: 'room'
});
db.room.belongsTo(db.department_has_address, {
    foreignKey: {
        name: 'department_has_address_id',
        allowNull: false
    },
    as: 'department_has_address'
});

db.room_type.hasMany(db.room, {
    foreignKey: {
        name: 'room_type_id',
        allowNull: false
    },
    as: 'room'
});
db.room.belongsTo(db.room_type, {
    foreignKey: {
        name: 'room_type_id',
        allowNull: false
    },
    as: 'room_type'
});

db.room.hasMany(db.harmonogram, {
    foreignKey: {
        name: 'room_id',
        allowNull: true
    },
    as: 'harmonogram'
});
db.harmonogram.belongsTo(db.room, {
    foreignKey: {
        name: 'room_id',
        allowNull: true
    },
    as: 'room'
});

db.item.hasMany(db.harmonogram, {
    foreignKey: {
        name: 'item_id',
        allowNull: true
    },
    as: 'harmonogram'
});
db.harmonogram.belongsTo(db.item, {
    foreignKey: {
        name: 'item_id',
        allowNull: true
    },
    as: 'item'
});

db.item_type.hasMany(db.item, {
    foreignKey: {
        name: 'item_type_id',
        allowNull: false
    },
    as: 'item'
});
db.item.belongsTo(db.item_type, {
    foreignKey: {
        name: 'item_type_id',
        allowNull: false
    },
    as: 'item_type'
});

db.user.hasMany(db.harmonogram, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'harmonogram'
});
db.harmonogram.belongsTo(db.user, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'user'
});

db.harmonogram.hasOne(db.schedule, {
    foreignKey: {
        name: 'harmonogram_id',
        allowNull: false
    },
    as: 'schedule'
});
db.schedule.belongsTo(db.harmonogram, {
    foreignKey: {
        name: 'harmonogram_id',
        allowNull: false
    },
    as: 'harmonogram'
})


db.user.hasMany(db.user_description, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'user_description'
});
db.user_description.belongsTo(db.user, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'user'
});

db.activity.hasMany(db.schedule, {
    foreignKey: {
        name: 'activity_id',
        allowNull: false
    },
    as: 'schedule'
});
db.schedule.belongsTo(db.activity, {
    foreignKey: {
        name: 'activity_id',
        allowNull: false
    },
    as: 'activity'
});

db.user.hasMany(db.article, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'article'
});
db.article.belongsTo(db.user, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'user'
});

db.user.belongsToMany(db.schedule, {
    through: "user_has_schedule",
    as: "schedules",
    foreignKey: "user_id"
});
db.schedule.belongsToMany(db.user, {
    through: "user_has_schedule",
    as: "users",
    foreignKey: "schedule_id"
});





// INSERT INTO roles VALUES (1, 'user', now(), now());
// INSERT INTO roles VALUES (2, 'employee', now(), now());
// INSERT INTO roles VALUES (3, 'admin', now(), now());
function init_roles() {
    db.role.findAll().then(roles => {
        if (roles < 3) {
            db.role.create({ name: "user" });
            db.role.create({ name: "employee" });
            db.role.create({ name: "admin" });
        }
    });
}


//alter:true force:false - nie wymazuj wszystkich danych ale stwórz na nowo tabele
//force:true - wymaż wszystko i stwórz na nowo
db.sequelize.sync({
    alter: true,
    force: false
}).then(() => {
    console.log('yes re-sync done!');
    init_roles();
})

db.ROLES = ["user", "employee", "admin"];

module.exports = db
