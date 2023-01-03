const { authJwt } = require("../middleware");
const controller = require("../controllers/user_description.controller.js");
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
    controller.all_descriptions
);

router.post(
    '/add',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.add_description
);

router.get(
    '/get/:id',
    // [authJwt.verifyToken],
    controller.one_description
);

router.get(
    '/get/user/:id',
    [authJwt.verifyToken],
    controller.user_descriptions
);

router.delete(
    '/delete/:id',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.delete_description
);

module.exports = router