const { authJwt } = require("../middleware");
const controller = require("../controllers/schedule.controller");
const router = require('express').Router()


router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get(
    '/get',
    [authJwt.verifyToken],
    controller.all_schedules
);

router.get(
    '/getScheduleUsers/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.get_schedule_users
);

router.post(
    '/add',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.add_schedule
);

router.put(
    '/addUserSchedule/:id',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.add_user
);

router.get(
    '/get/:id',
    [authJwt.verifyToken],
    controller.one_schedule
);

router.put(
    '/edit/:id',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.edit_schedule
);

router.delete(
    '/delete/:id',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.delete_schedule
);

module.exports = router