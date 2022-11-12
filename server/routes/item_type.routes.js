const { authJwt } = require("../middleware");
const ItemTypeController = require("../controllers/item_type.controller.js");

const router = require('express').Router()

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get("/getItemTypes", [authJwt.verifyToken, authJwt.isEmployee],ItemTypeController.getItem_types);
router.post('/addItemType',[authJwt.verifyToken, authJwt.isAdmin], ItemTypeController.addItem_type);
router.put('/editItemType',[authJwt.verifyToken, authJwt.isAdmin], ItemTypeController.editItem_type);
router.delete('/deleteItemType',[authJwt.verifyToken, authJwt.isAdmin], ItemTypeController.deleteItem_type);
router.get("/getItemType/:id",[authJwt.verifyToken, authJwt.isEmployee], ItemTypeController.getItem_type);
module.exports = router