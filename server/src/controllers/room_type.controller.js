const db = require("../models");
const { room_type: RoomType } = db;

exports.all_room_types = async (req, res) => {
    await RoomType.findAll({order: [['name', 'ASC']]})
        .then((types) => {
            res.status(200).send(types);
        }).catch((err) => {
            res.status(500).send({ message: err.message });
        })
}
exports.add_room_type = async (req, res) => {
    let data = {
        name: req.body.name
    }

    if (data.name == "" || data.name == null) {
        res.status(400).send({ message: "Name cannot be empty." });
    } else if (data.name.length > 45) {
        res.status(400).send({ message: "Name cannot exceed 45 characters." });
    } else {
        await RoomType.create(data)
            .then(() => {
                res.status(200).send({ message: "Successfully created room type." });
            }).catch((err) => {
                res.status(500).send({ message: err.message });
            })
    }
}
exports.delete_room_type = async (req, res) => {
    await RoomType.destroy({
        where: { id: req.params.id }
    })
        .then(() => {
            res.status(200).send({ message: "Successfully deleted room type." });
        }).catch((err) => {
            res.status(500).send({ message: err.message });
        })

};
exports.edit_room_type = async (req, res) => {

    await RoomType.findOne({
        where: { id: req.params.id }
    }).then(async (room_type) => {
        let data = {
            name: req.body.name
        }

        if (data.name == "" || data.name == null) {
            res.status(400).send({ message: "Name cannot be empty." });
        } else if (data.name.length > 45) {
            res.status(400).send({ message: "Name cannot exceed 45 characters." });
        } else {
            room_type.name = data.name;
            room_type.save({ fields: ['name'] })
                .then(() => {
                    res.status(200).send({ message: "Successfully updated room type." });
                }).catch((err) => {
                    res.status(500).send({ message: err.message });
                })
        }
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    })

}
exports.one_room_type = async (req, res) => {

    await RoomType.findOne({
        where: { id: req.params.id }
    }).then((room_type) => {
        res.status(200).send(room_type);
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    })

}