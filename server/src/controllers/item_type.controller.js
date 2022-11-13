const db = require("../models");
const { item_type: ItemType } = db

exports.all_item_types = async (req, res) => {
    await ItemType.findAll({})
        .then((types) => {
            res.status(200).send(types);
        }).catch((err) => {
            res.status(500).send({ message: err.message });
        })
};

exports.add_item_type = async (req, res) => {
    let data = {
        name: req.body.name
    }
    if (data.name == "" || data.name == null) {
        res.status(400).send({ message: "Name cannot be empty." });
    } else if (data.name.length > 45) {
        res.status(400).send({ message: "Name cannot exceed 45 characters." });
    } else {
        await ItemType.create(data)
            .then(() => {
                res.status(200).send({ message: "Successfully created item type." });
            }).catch((err) => {
                res.status(500).send({ message: err.message });
            })
    }
};

exports.delete_item_type = async (req, res) => {
    await ItemType.destroy({ where: { id: req.body.id } })
        .then(() => {
            res.status(200).send({ message: "Successfully deleted item type." });
        }).catch((err) => {
            res.status(500).send({ message: err.message });
        })

};

exports.edit_item_type = async (req, res) => {

    await ItemType.findOne({
        where: { id: req.body.id }
    }).then(async (item_type) => {
        let data = {
            name: req.body.name
        }

        if (data.name == "" || data.name == null) {
            res.status(400).send({ message: "Name cannot be empty." });
        } else if (data.name.length > 45) {
            res.status(400).send({ message: "Name cannot exceed 45 characters." });
        } else {
            item_type.name = data.name;
            item_type.save({ fields: ['name'] })
                .then(() => {
                    res.status(200).send({ message: "Successfully updated item type." });
                }).catch((err) => {
                    res.status(500).send({ message: err.message });
                })
        }
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    })

}
exports.one_item_type = async (req, res) => {

    await ItemType.findOne({
        where: { id: req.params.id }
    }).then((item_type) => {
        res.status(200).send(item_type);
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    })

}