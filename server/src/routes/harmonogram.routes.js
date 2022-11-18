const { authJwt } = require("../middleware");
const controller = require("../controllers/harmonogram.controller");
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
    controller.all_harmonograms
);

router.post(
    '/add',
    [authJwt.verifyToken],
    controller.add_harmonogram
);

router.get(
    '/get/:id',
    [authJwt.verifyToken],
    controller.one_harmonogram
);

router.put(
    '/edit/:id',
    [authJwt.verifyToken],
    controller.edit_harmonogram
);

router.delete(
    '/delete/:id',
    [authJwt.verifyToken],
    controller.delete_harmonogram
);

router.patch(
    '/accept/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.accept_harmonogram
);

module.exports = router