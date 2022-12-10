const { user, harmonogram } = require("../models");
const db = require("../models");
const { user: User, harmonogram: Harmonogram, schedule: Schedule, user_has_schedule: UserSchedule } = db;

const Op = db.Sequelize.Op;

exports.all_schedules = async (req, res) => {
    await Schedule.findAll({
        include: ["user_has_schedule"]
    }).then(schedules => {
        res.status(200).send(schedules)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.add_schedule = async (req, res) => {
    await Harmonogram.findOne({
        where: { id: req.body.harmonogram_id }
    }).then(harmonogram => {
        //if (harmonogram.admin_consent) {
        Schedule.create({
            activity_id: req.body.activity_id,
            harmonogram_id: req.body.harmonogram_id
        }).then(schedule => {
            res.send({ message: "Schedule created." });
        }).catch(err => {
            console.log(err.message);
            res.status(500).send({ message: err.message });
        });
        //} else {
        //    res.status(500).send("Harmonogram must be acctepted by admin first");
        //}
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.one_schedule = async (req, res) => {
    await Schedule.findOne({
        where: { id: req.params.id }
    }).then(schedule => {
        res.status(200).send(schedule);
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.edit_schedule = async (req, res) => {
    Schedule.findOne({
        where: { id: req.params.id }
    }).then(schedule => {
        schedule.set({
            activity_id: req.body.activity_id
        })
        schedule.save();
        res.status(200).send("Schedule updated.");
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.add_user = async (req, res) => {
    await Schedule.findOne({
        where: { id: req.params.id }
    }).then(schedule => {
        /*
        UserSchedule.findAll({
            where: {schedule_id: schedule.id}
        }).then(userSchedule => {
            userSchedule.destroy();
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
*/
        var users = req.body;
        users.forEach(user => {
            User.findOne({
                where: { id: user.id }
            }).then(user => {

                var data = {
                    schedule_id: schedule.id,
                    user_id: user.id
                };

                UserSchedule.create(data)
                    .catch(err => {
                        res.status(500).send({ message: err.message });
                    });
            }).catch(err => {
                res.status(500).send({ message: err.message });
            });
        });

        res.status(200).send("Users updated.");

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.delete_schedule = async (req, res) => {
    await Schedule.findOne({
        where: { id: req.params.id }
    }).then(schedule => {
        Harmonogram.findOne({where: {id: schedule.harmonogram_id}})
        .then(harmonogram => {
            harmonogram.destroy();
        });
        schedule.destroy();
        res.status(200).send("Schedule deleted.");
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.get_schedule_users = async (req, res) => {
    await UserSchedule.findAll({
        where: {
            schedule_id: req.params.id
        }
    }).then(schedules => {
        res.status(200).send(schedules);
    }).catch(err => {
        res.status(200).send(null);
    });
}