const { schedule, harmonogram } = require("../models");
const db = require("../models");
const { refreshToken } = require("./auth.controller");
const { user: User, harmonogram: Harmonogram, schedule: Schedule } = db;

const Op = db.Sequelize.Op;

exports.all_schedules = (req, res) => {
    Schedule.findAll({include: "users"}).then(schedules => {
        res.status(200).send(schedules)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.add_schedule = (req, res) => {
    Harmonogram.findOne({
        where: {id: req.body.harmonogram_id}
    }).then(harmonogram => {
        if (harmonogram.admin_consent) {
            Schedule.create({
                activity_id: req.body.activity_id,
                harmonogram_id: harmonogram.id
            }).then(schedule => {
                res.send({ message: "Schedule created." });
            }).catch(err => {
                console.log(err.message);
                res.status(500).send({ message: err.message });
            });
        } else {
            res.status(500).send("Harmonogram must be acctepted by admin first");
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });


};

exports.one_schedule = (req, res) => {
    Schedule.findOne({
        where: { id: req.params.id },
        include: "users"
    }).then(schedule => {
        res.status(200).send(schedule);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.update_schedule = (req, res) => {
    User.findOne({
        where: { id: req.body.user_id }
    }).then(user => {
        Schedule.findOne({
            where: { id: req.params.id }
        }).then(schedule => {
            schedule.addUser(user.id);
            schedule.save();
            res.status(200).send("Schedule updated.");
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.delete_schedule = (req, res) => {
    Schedule.findOne({
        where: { id: req.params.id }
    }).then(schedule => {
        schedule.destroy();
        res.status(200).send("Schedule deleted.");
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}