const { authJwt } = require("../middleware");
const controller = require("../controllers/room_type.controller.js");
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
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.all_room_types);

router.post(
    '/add',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.add_room_type);

router.put(
    '/edit/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.edit_room_type);

router.delete(
    '/delete/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete_room_type);

router.get(
    '/get/:id',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.one_room_type);

module.exports = router
