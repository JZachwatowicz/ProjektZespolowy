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
    db.role.findAll().then(e => {
        if (e < 3) {
            db.role.create({ id: 1, name: "user" });
            db.role.create({ id: 2, name: "employee" });
            db.role.create({ id: 3, name: "admin" });
        }
    });
}

function init_users() {
    db.user.findAll().then(e => {
        if (e < 3) {
            db.user.create({
                id: 1,
                username: "jan",
                email: "jan@kowalski.pl",
                password: "$2a$08$HHafX.QQ3pfwCIq6Or8H7uMuLfhgJ9vPvUxX.JNe3nKVFSER0yHt2",
                first_name: "Jan",
                birth_date: new Date(),
                last_name: "Kowalski",
                pesel: "02321299999",
                contact_number: "505303202",
                role_id: 3
              });
              db.user.create({
                id:2,
                username: "adam",
                email: "adam@nowak.pl",
                password: "$2a$08$dOss1TzwH8RoB0GDkMS91O3f9Q.IxYtumTTBQrctgMGrsfvmB9ECa",
                first_name: "Adam",
                birth_date: new Date(),
                last_name: "Nowak",
                pesel: "98021099999",
                contact_number: "503503202",
                role_id: 2
              });
              db.user.create({
                id:3,
                username: "anna",
                email: "anna@grodzka.pl",
                birth_date: new Date(),
                password: "$2a$08$tw13uwmpH8x8u6uCAkNe1eB6z8YfMUIyBDv0KhU.86mOMHgpXbLsm",
                first_name: "Anna",
                last_name: "Grodzka",
                pesel: "70081523235",
                contact_number: "098098098",
                role_id: 1
              });
        }
    });
}
function init_user_descriptions() {
    db.user_description.findAll().then(e => {
        if (e < 3) {
            db.user_description.create({id: 1, title: "zdolny", description: "lorem ipsum" , author: "1", user_id: 3});
            db.user_description.create({id: 2, title: "nagana", description: "opis użytkownika" , author: "1", user_id: 2});
            db.user_description.create({id: 3, title: "pochwała", description: "bardzo dobrze", author: "2", user_id: 3  });
        }
    });
}
function init_room_types() {
    db.room_type.findAll().then(e => {
        if (e < 3) {
            db.room_type.create({id: 1, name: "Wykładowa"});
            db.room_type.create({id: 2, name: "Ćwiczeniowa"});
            db.room_type.create({id: 3, name: "Standardowa"});
        }
    });
}
function init_rooms() {
    db.room.findAll().then(e => {
        if (e < 3) {
            db.room.create({id: 1, name: "S102", capacity: "8", department_has_address_id: 1, room_type_id: 1});
            db.room.create({id: 2, name: "G204", capacity: "20", department_has_address_id: 2, room_type_id: 2});
            db.room.create({id: 3, name: "A21", capacity: "15",department_has_address_id: 3,  room_type_id: 2});
        }
    });
}
function init_item_types() {
    db.item_type.findAll().then(e => {
        if (e < 3) {
            db.item_type.create({id: 1, name: "Personalny"});
            db.item_type.create({id: 2, name: "Specjalny"});
            db.item_type.create({id: 3, name: "Standardowy"});
        }
    });
}
function init_items() {
    db.item.findAll().then(e => {
        if (e < 3) {
            db.item.create({id: 1, name: "Kule", serial_number: "8", possesion_date: new Date(), item_type_id: 3});
            db.item.create({id: 2, name: "Wózek", serial_number: "20", possesion_date: new Date(), item_type_id: 1});
            db.item.create({id: 3, name: "Kule", serial_number: "15",possesion_date: new Date(),  item_type_id: 3});
        }
    });
}
function init_departments() {
    db.department.findAll().then(e => {
        if (e < 3) {
            db.department.create({id: 1, name: "dep1",  description: "opis department 1"});
            db.department.create({id: 2, name: "dep2",  description: "opis department 2"});
            db.department.create({id: 3, name: "dep3", description: "opis department 3"});
        }
    });
}
function init_activities() {
    db.activity.findAll().then(e => {
        if (e < 3) {
            db.activity.create({id: 1, name: "activity 1",  description: "opis activity 1"});
            db.activity.create({id: 2, name: "activity 2",  description: "opis activity 2"});
            db.activity.create({id: 3, name: "activity 3", description: "opis activity 3"});
        }
    });
}
function init_articles() {
    db.article.findAll().then(e => {
        if (e < 3) {
            db.article.create({id: 1, title: "Artykuł 1",  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis hendrerit ante, sed dignissim magna. Pellentesque ullamcorper, erat a mattis vehicula, ipsum eros posuere eros, at feugiat libero erat et mauris. Integer aliquet, justo a varius interdum, arcu ligula rutrum elit, ut tempus lorem eros et enim. Praesent lacinia lorem ut dapibus fringilla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut tempus dictum lectus sit amet condimentum. Suspendisse ac maximus velit. In hac habitasse platea dictumst. Nam rutrum vestibulum est eget eleifend. Curabitur consectetur sodales lobortis.  1", user_id: 2});
            db.article.create({id: 2, title: "Artykuł 2",  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis hendrerit ante, sed dignissim magna. Pellentesque ullamcorper, erat a mattis vehicula, ipsum eros posuere eros, at feugiat libero erat et mauris. Integer aliquet, justo a varius interdum, arcu ligula rutrum elit, ut tempus lorem eros et enim. Praesent lacinia lorem ut dapibus fringilla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut tempus dictum lectus sit amet condimentum. Suspendisse ac maximus velit. In hac habitasse platea dictumst. Nam rutrum vestibulum est eget eleifend. Curabitur consectetur sodales lobortis.  2", user_id: 3});
            db.article.create({id: 3, title: "Artykuł 3", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis hendrerit ante, sed dignissim magna. Pellentesque ullamcorper, erat a mattis vehicula, ipsum eros posuere eros, at feugiat libero erat et mauris. Integer aliquet, justo a varius interdum, arcu ligula rutrum elit, ut tempus lorem eros et enim. Praesent lacinia lorem ut dapibus fringilla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut tempus dictum lectus sit amet condimentum. Suspendisse ac maximus velit. In hac habitasse platea dictumst. Nam rutrum vestibulum est eget eleifend. Curabitur consectetur sodales lobortis.  3", user_id: 3});
        }
    });
}
function init_addresses() {
    db.address.findAll().then(e => {
        if (e < 3) {
            db.address.create({id: 1, building_number: "3", apartment_number: null });
            db.address.create({id: 2, building_number: "15", apartment_number: "3"});
            db.address.create({id: 3, building_number: "140",apartment_number: "2"});
        }
    });
}
function init_departments_has_addresses() {
    db.department_has_address.findAll().then(e => {
        if (e < 3){
            db.department_has_address.create({id: 1, address_id: 1, department_id: 1})
            db.department_has_address.create({id: 2, address_id: 2, department_id: 2})
            db.department_has_address.create({id: 3, address_id: 3, department_id: 3})
        }
    })
}
// alter:true force:false - nie wymazuj wszystkich danych ale stwórz na nowo tabele
// force:true - wymaż wszystko i stwórz na nowo
db.sequelize.sync({
    alter: true,
    force: true
}).then(() => {
    console.log('yes re-sync done!');
    init_roles();
    init_addresses();
    init_room_types();
    init_departments();
    init_users();

    init_activities();
    init_item_types();
}).then(() => {
    init_articles();
    init_items();
    init_departments_has_addresses();
    init_rooms();
    init_user_descriptions();

})

db.ROLES = ["user", "employee", "admin"];

module.exports = db
