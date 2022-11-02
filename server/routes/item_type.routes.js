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

router.get("/getItemTypes", ItemTypeController.getItem_types);
router.post('/addItemType', ItemTypeController.addItem_type);
router.put('/editItemType', ItemTypeController.editItem_type);
router.delete('/deleteItemType', ItemTypeController.deleteItem_type);
router.get("/getItemType/:id", ItemTypeController.getItem_type);
module.exports = router