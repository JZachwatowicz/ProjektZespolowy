const { authJwt } = require("../middleware");
const controller = require("../controllers/room.controller.js");
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
    controller.all_rooms
);

router.get(
    '/getDepartments',
    [authJwt.verifyToken],
    controller.departments
);

router.post(
    '/add',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.add_room
);

router.put(
    '/edit/:id',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.edit_room
);

router.delete(
    '/delete/:id',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.delete_room
);

router.get(
    '/get/:id',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.one_room
);

module.exports = router