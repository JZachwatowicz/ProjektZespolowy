const { authJwt } = require("../middleware");
const controller = require("../controllers/activity.controller.js");

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
    controller.all_activities
);

router.post(
    '/add',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.add_activity
);

router.put(
    '/edit',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.edit_activity
);

router.delete(
    '/delete',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.delete_activity
);

router.get(
    '/get/:id',
    [authJwt.verifyToken],
    controller.one_activity
);

module.exports = router