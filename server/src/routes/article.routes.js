const { authJwt } = require("../middleware");
const controller = require("../controllers/article.controller");
const router = require('express').Router()


router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get(
    '/',
    controller.home_articles
);

router.get(
    '/get',
    controller.all_articles
);

router.post(
    '/add',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.add_article
);

router.get(
    '/get/:id',
    controller.one_article
);

router.put(
    '/edit/:id',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.edit_article
);

router.delete(
    '/delete/:id',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.delete_article
);

module.exports = router