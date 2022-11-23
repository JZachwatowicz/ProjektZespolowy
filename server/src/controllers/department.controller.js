const db = require("../models");
const { department: Department, address: Address, department_has_address:  Department_Has_Address} = db;

exports.all_departments = async (req, res) => {
    await Department.findAll({order: [['name', 'ASC']]})
        .then((departments) => {
            res.status(200).send(departments);
        }).catch((err) => {
            res.status(500).send({ message: err.message });
        })

};

exports.delete_department = async (req, res) => {
    await Department_Has_Address.destroy({
        where: { department_id: req.params.id }
    })

    await Department.destroy({
        where: { id: req.params.id }
    })
        .then(() => {
            res.status(200).send({ message: "Successfully deleted department." });
        }).catch((err) => {
            res.status(500).send({ message: err.message });
        })
    
};

exports.add_department = async (req, res) => {
    let data = {
        name: req.body.name,
        description: req.body.description
    }


    if (data.name == "" || data.name == null) {
        res.status(400).send({ message: "Name cannot be empty." });
    } else if (data.name.length > 45) {
        res.status(400).send({ message: "Name cannot exceed 45 characters." });
    } else if (data.description.length > 250) {
        res.status(400).send({ message: "Description cannot exceed 250 characters." });
    } else {
        await Department.create(data)
            .then((data) => {
                res.status(200).send(data);
            }).catch((err) => {
                res.status(500).send({ message: err.message });
            })
    }
}
exports.edit_department = async (req, res) => {
    await Department.findOne({
        where: { id: req.params.id }
    }).then(async (department) => {
        let data = {
            name: req.body.name,
            description: req.body.description
        }

        if (data.name == "" || data.name == null) {
            res.status(400).send({ message: "Name cannot be empty." });
        } else if (data.name.length > 45) {
            res.status(400).send({ message: "Name cannot exceed 45 characters." });
        } else if (data.description.length > 250) {
            res.status(400).send({ message: "Description cannot exceed 250 characters." });
        } else {
            department.name = data.name;
            department.description = (data.description == null ? '' : data.description)
            await department.save({ fields: ['name', 'description'] })
                .then(() => {
                    res.status(200).send({ message: "Successfully updated department." });
                }).catch((err => {
                    res.status(500).send({ message: err.message });
                }))
        }
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    })

}
exports.one_department = async (req, res) => {

    await Department.findOne({
        where: { id: req.params.id }
    }).then((department) => {
        res.status(200).send(department);
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    })

}

exports.AddressToDepartment = async (req, res) => {

    let data = {
        department_id : req.body.department_id,
        address_id: req.body.address_id
    }

    await Department_Has_Address.create(data)
    .then(() => {
        res.status(200);
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    })

}
