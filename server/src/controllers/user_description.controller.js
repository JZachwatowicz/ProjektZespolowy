const db = require("../models");
const { user_description: UserDescription } = db;


exports.all_descriptions = async (req, res) => {
    await UserDescription.findAll({
        order: [['createdAt', 'DESC']]
    }).then(descriptions => {
        res.status(200).send(descriptions)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};
exports.user_descriptions = async (req, res) => {
    await UserDescription.findAll({
        where: { user_id: req.params.id },
        order: [['createdAt', 'DESC']]
    }).then(descriptions => {
        res.status(200).send(descriptions)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.add_description = async (req, res) => {
    await UserDescription.create({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        user_id: req.body.user_id
    }).then(() => {
        res.send({ message: "Description was added successfully!" });
    }).catch(err => {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    });
};

exports.one_description = async (req, res) => {
    await UserDescription.findOne({
        where: { id: req.params.id }
    }).then(article => {
        res.status(200).send(article);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.delete_description = async (req, res) => {
    await UserDescription.findOne({
        where: { id: req.params.id }
    }).then(article => {
        article.destroy();
        res.status(200).send("Delete article.");
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}