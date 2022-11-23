const { authJwt } = require("../middleware");
const controller = require("../controllers/department.controller.js");

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
    controller.all_departments
);

router.post(
    '/add',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.add_department
);

router.post(
    '/AddressToDepartment',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.AddressToDepartment
);

router.put(
    '/edit/:id',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.edit_department
);

router.delete(
    '/delete/:id',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.delete_department
);

router.get(
    '/get/:id',
    [authJwt.verifyToken],
    controller.one_department
);

module.exports = router