const db = require("../models");
const { user: User } = db;

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
    await User.findOne({
        where: { id: req.params.id }
    }).then(user => {
        user.set({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            pesel: req.body.pesel,
            contactNumber: req.body.contactNumber
        });

        user.save({
            fields: [
                'username',
                'email',
                'password',
                'firstName',
                'lastName',
                'pesel',
                'contactNumber'
            ]
        });

        res.status(200).send("Update user.");
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.edit_user_address = async (req, res) => {
    await User.findOne({
        where: { id: req.params.id }
    }).then(user => {
        user.set({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            pesel: req.body.pesel,
            contactNumber: req.body.contactNumber
        });

        user.save({
            fields: [
                'username',
                'email',
                'password',
                'firstName',
                'lastName',
                'pesel',
                'contactNumber'
            ]
        });

        res.status(200).send("Update user.");
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

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