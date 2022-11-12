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

router.get('/', controller.home_articles);
router.get('/article', controller.all_articles);
router.post(
    '/article', 
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.post_article
);
router.get('/article/:id', controller.one_article);
router.put(
    '/article/:id', 
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.update_article
);
router.delete(
    '/article/:id',
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.delete_article
);

module.exports = router