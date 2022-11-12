const { harmonogram } = require("../models");
const db = require("../models");
const { refreshToken } = require("./auth.controller");
const { user: User, harmonogram: Harmonogram } = db;

const Op = db.Sequelize.Op;

exports.all_harmonograms = (req, res) => {
    var begin_date = req.query.begin_date ? {begin_date: {[Op.gte]: req.query.begin_date}}: {};
    var end_date = req.query.end_date ? {end_date: {[Op.lte]: req.query.end_date}}: {};
    var user_id = req.query.user_id ? {user_id: req.query.user_id}: {};
    var admin_consent = req.query.admin_consent ? {admin_consent: req.query.admin_consent}: {};
    //var room_id = req.query.room_id ? {room_id: req.query.room_id}: {};
    //var item_id = req.query.item_id ? {item_id: req.query.item_id}: {};

    var condition = begin_date + end_date + user_id + admin_consent;// + room_id + item_id;
    if(condition != ""){
        condition = {where: {
            [Op.and]: [
                begin_date,
                end_date,
                user_id,
                admin_consent,
                //room_id,
                //item_id
            ]
        }};
    } else {
        condition = {};
    }

    Harmonogram.findAll(condition)
    .then(harmonograms => {
        res.status(200).send(harmonograms)
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};

exports.add_harmonogram = (req, res) => {
    Harmonogram.create({
        begin_date: req.body.begin_date,
        end_date: req.body.end_date,
        user_id: req.body.user_id
    }).then(harmonogram => {
        res.send({ message: "Harmonogram added." });
    }).catch(err => {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    });
};

exports.one_harmonogram = (req, res) => {
    Harmonogram.findOne({
        where: {id: req.params.id}
    }).then(harmonogram => {
        res.status(200).send(harmonogram);
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};

exports.update_harmonogram = (req, res) => {
    Harmonogram.findOne({
        where: {id: req.params.id}
    }).then(harmonogram => {
        console.log(harmonogram);
        harmonogram.set({
            begin_date: req.body.begin_date,
            end_date: req.body.end_date
        });
        harmonogram.save({
            fields: ['begin_date', 'end_date']
        });
        res.status(200).send("Harmonogram updated.");
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
};

exports.delete_harmonogram = (req, res) => {
    Harmonogram.findOne({
        where: {id: req.params.id}
    }).then(harmonogram => {
        harmonogram.destroy();
        res.status(200).send("Harmonogram deleted.");
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
}

exports.accept_harmonogram = (req, res) => {
    Harmonogram.findOne({
        where: {id: req.params.id}
    }).then(harmonogram => {
        harmonogram.set({
            admin_consent: 1
        });
        harmonogram.save({
            fields: ['admin_consent']
        });
        res.status(200).send("Harmonogram accepted.");
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
}