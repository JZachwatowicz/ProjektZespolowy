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

router.get('/',
    [authJwt.verifyToken],
    controller.all_harmonograms
);
router.post(
    '/harmonogram',
    [authJwt.verifyToken],
    controller.add_harmonogram
);
router.get(
    '/harmonogram/:id',
    [authJwt.verifyToken],
    controller.one_harmonogram
);
router.put(
    '/harmonogram/:id',
    [authJwt.verifyToken],
    controller.update_harmonogram
);
router.delete(
    '/harmonogram/:id',
    [authJwt.verifyToken],
    controller.delete_harmonogram
);
router.patch(
    '/harmonogram/:id',
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.accept_harmonogram
);

module.exports = router