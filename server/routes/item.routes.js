const { authJwt } = require("../middleware");
const ItemController = require("../controllers/item.controller.js");

const router = require('express').Router()

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get("/allItems",[authJwt.verifyToken, authJwt.isEmployee],ItemController.allItems);
router.post('/addItem', [authJwt.verifyToken, authJwt.isEmployee],ItemController.addItem);
router.put('/editItem',[authJwt.verifyToken, authJwt.isEmployee], ItemController.editItem);
router.delete("/deleteItem",[authJwt.verifyToken, authJwt.isEmployee], ItemController.deleteItem);
router.get("/getItem/:id",[authJwt.verifyToken, authJwt.isEmployee], ItemController.getItem);
module.exports = router