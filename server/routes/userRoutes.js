const { authJwt } = require("../middleware");
const controller = require("../controllers/userController");

const router = require('express').Router()


router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get("/test/all", controller.allAccess);

router.get(
    "/test/user",
    [authJwt.verifyToken],
    controller.userBoard
);

router.get(
    "/test/employee",
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.employeeBoard
);

router.get(
    "/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
);
module.exports = router