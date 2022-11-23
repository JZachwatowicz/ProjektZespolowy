const db = require("../models");
const { room: Room , department_has_address: Department_Has_Address, department: Department} = db;

exports.all_rooms = async (req, res) => {
    await Room.findAll({order: [['name', 'ASC']]})
        .then((rooms) => {
            res.status(200).send(rooms);
        }).catch((err) => {
            res.status(500).send({ message: err.message });
        })
};

exports.departments = async (req, res) => {
    await Department_Has_Address.findAll({include: [{model: Department , as : 'department'}]})
        .then((rooms) => {
            res.status(200).send(rooms);
        }).catch((err) => {
            res.status(500).send({ message: err.message });
        })
};

exports.delete_room = async (req, res) => {
    await Room.destroy({
        where: { id: req.params.id }
    })
        .then(() => {
            res.status(200).send({ message: "Successfully deleted room." });
        }).catch((err) => {
            res.status(500).send({ message: err.message });
        })

};

exports.add_room = async (req, res) => {
    let data = {
        name: req.body.name,
        capacity: req.body.capacity,
        room_type_id: req.body.room_type_id,
        department_has_address_id: req.body.department_id
    }
    if (data.name == "" || data.name == null) {
        res.status(400).send({ message: "Name cannot be empty." });
    } else if (data.name.length > 45) {
        res.status(400).send({ message: "Name cannot exceed 45 characters." });
    } else if (isNaN(data.capacity)) {
        res.status(400).send({ message: "Capacity has to be a number." });
    } else if (data.room_type_id == null) {
        res.status(400).send({ message: "Room type cannot be empty." });
    } else {
        await Room.create(data)
            .then(() => {
                res.status(200).send({ message: "Successfully created room." });
            }).catch((err) => {
                res.status(500).send({ message: err.message });
            })
    }

}
exports.edit_room = async (req, res) => {

    await Room.findOne({
        where: {
            id: req.params.id
        }
    }).then(async (room) => {
        let data = {
            name: req.body.name,
            capacity: req.body.capacity,
            room_type_id: req.body.room_type_id,
            department_has_address_id: req.body.department_id
        }

        if (data.name == "" || data.name == null) {
            res.status(400).send({ message: "Name cannot be empty." });
        } else if (data.name.length > 45) {
            res.status(400).send({ message: "Name cannot exceed 45 characters." });
        } else if (isNaN(data.capacity)) {
            res.status(400).send({ message: "Capacity has to be a number." });
        } else if (data.room_type_id == null) {
            res.status(400).send({ message: "Room type cannot be empty." });
        } else {
            room.name = data.name;
            room.capacity = data.capacity;
            room.room_type_id = data.room_type_id;
            room.department_has_address_id = data.department_has_address_id;
            room.save({ fields: ['name', 'capacity', 'room_type_id', 'department_has_address_id'] })
                .then(() => {
                    res.status(200).send({ message: "Successfully updated room." });
                }).catch((err) => {
                    res.status(500).send({ message: err.message });
                })
        }
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    })

}
exports.one_room = async (req, res) => {

    await Room.findOne({
        where: { id: req.params.id }
    }).then((room) => {
        res.status(200).send(room);
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    })
}