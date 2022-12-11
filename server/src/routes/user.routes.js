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
router.get("/all/get", controller.all_users);
router.get("/all/get/:id", controller.one_user);


router.get(
    '/get',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.all_users
);

router.post(
    '/add',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.add_user
);

router.put(
    '/edit/:id',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.edit_user
);
router.put(
    '/editaddress/:id',
    authJwt.verifyToken,
    controller.edit_user_address
);

router.delete(
    '/delete/:id',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.delete_user
);

router.get(
    '/get/:id',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.one_user
);


// router.put(
//     "/edit_address/:id",
//     [authJwt.verifyToken],
//     controller.edit_user_address
// );

// router.put(
//     "/edit_roles/:id",
//     [authJwt.verifyToken, authJwt.isAdmin],
//     controller.edit_user_roles
// );

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