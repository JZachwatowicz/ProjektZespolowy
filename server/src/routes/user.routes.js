const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const router = require('express').Router()


router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get("/all", controller.allAccess);

router.get(
    "/user",
    [authJwt.verifyToken],
    controller.userBoard
);

router.get(
    "/employee",
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.employeeBoard
);

router.get(
    "/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
);
module.exports = router