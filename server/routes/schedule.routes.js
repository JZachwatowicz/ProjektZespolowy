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

router.get('/',
    [authJwt.verifyToken],
    controller.all_schedules
);
router.post(
    '/schedule',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.add_schedule
);
router.get(
    '/schedule/:id',
    [authJwt.verifyToken],
    controller.one_schedule
);
router.put(
    '/schedule/:id',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.update_schedule
);
router.delete(
    '/schedule/:id',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.delete_schedule
);

module.exports = router