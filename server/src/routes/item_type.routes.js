const { authJwt } = require("../middleware");
const controller = require("../controllers/item_type.controller.js");
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
    controller.all_item_types
);

router.post(
    '/add',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.add_item_type
);

router.put(
    '/edit',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.edit_item_type
);

router.delete(
    '/delete',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete_item_type
);

router.get(
    '/get/:id',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.one_item_type
);

module.exports = router