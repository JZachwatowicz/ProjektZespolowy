const { article } = require("../models");
const db = require("../models");
const { refreshToken } = require("./auth.controller");
const { user: User, article: Article } = db;

const Op = db.Sequelize.Op;

exports.home_articles = (req, res) => {
    Article.findAll({
        order: [['createdAt', 'DESC']],
        limit: 3
    }).then(articles => {
        res.status(200).send(articles)
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};

exports.all_articles = (req, res) => {
    Article.findAll({
        order: [['createdAt', 'DESC']]
    }).then(articles => {
        res.status(200).send(articles)
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};

exports.add_article = (req, res) => {
    Article.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.user_id
    }).then(article => {
        //article.getUser().then(() => {
            res.send({ message: "Article was added successfully!" });
        //});
    }).catch(err => {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    });
};

exports.one_article = (req, res) => {
    Article.findOne({
        where: {id: req.params.id}
    }).then(article => {
        res.status(200).send(article);
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};

exports.edit_article = (req, res) => {
    Article.findOne({
        where: {id: req.params.id}
    }).then(article => {
        console.log(article);
        article.set({
            title: req.body.title,
            content: req.body.content
        });
        article.save({
            fields: ['title', 'content']
        });
        res.status(200).send("Update article.");
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};

exports.delete_article = (req, res) => {
    Article.findOne({
        where: {id: req.params.id}
    }).then(article => {
        article.destroy();
        res.status(200).send("Delete article.");
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
}