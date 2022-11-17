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