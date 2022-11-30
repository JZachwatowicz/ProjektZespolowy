const db = require("../models");
const { user: User } = db;
const { createUserRole } = require('../services/user.service');


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.employeeBoard = (req, res) => {
    res.status(200).send("Employee Content.");
};

exports.one_user = async (req, res) => {
    await User.findOne({
        where: { id: req.params.id }
    }).then(user => {
        res.status(200).send(user);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.all_users = async (req, res) => {
    await User.findAll({
        order: [['createdAt', 'DESC']]
    }).then(users => {
        res.status(200).send(users)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.edit_user = async (req, res) => {

    const { username, email, password, firstName, lastName, pesel, contactNumber, role_id } = req.body

    await User.findOne({
        where: { id: req.params.id }
    }).then(user => {
        user.set({
            username,
            email,
            password,
            firstName,
            lastName,
            pesel,
            contactNumber,
            role_id
        });

        user.save({
            fields: [
                'username',
                'email',
                'password',
                'firstName',
                'lastName',
                'pesel',
                'contactNumber',
                'role_id'
            ]
        });

        res.status(200).send("Update user.");
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.edit_user_roles = async (req, res) => {
    await User.findOne({
        where: { id: req.params.id }
    }).then(user => {
        user.set({
            role_id: req.body.role_id
        });

        user.save({
            fields: ['role_id']
        });

        res.status(200).send("Update user.");
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.edit_user_address = async (req, res) => {

    const user = await User.findOne({
        where: { id: req.params.id }
    });

    if (user) {
        user.address_id = req.body.address_id;

        await user.save();
        res.status(200).send("OK");

    } else {
        res.status(500).send("USER NOT FOUND");
    }
}






exports.delete_user = async (req, res) => {
    await User.destroy({
        where: { id: req.params.id }
    }).then(() => {
        res.status(200).send({ message: "Successfully deleted user." });
    }).catch((err) => {
        res.status(500).send({ message: err.message });
    })

};




exports.add_user = async (req, res) => {

    const { username, email, password, firstName, lastName, pesel, contactNumber, role_id } = req.body

    await createUserRole(username, email, password, firstName, lastName, pesel, contactNumber, role_id)
        .then(() => {
            res.send({ message: "User was registered successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message, requestData: req.body });
        });

};