const { authJwt } = require("../middleware");
const controller = require("../controllers/address.controller.js");
const { isAdmin } = require("../middleware/auth_jwt");
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
    controller.all_addresses
);

router.post(
    '/add',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.add_address
);

router.put(
    '/edit/:id',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.edit_address
);

router.delete(
    '/delete/:id',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.delete_address
);

router.get(
    '/get/:id',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.one_address
);

module.exports = router