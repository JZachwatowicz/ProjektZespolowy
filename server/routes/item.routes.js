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

router.get("/allItems",ItemController.allItems);
router.post('/addItem', ItemController.addItem);
router.put('/editItem', ItemController.editItem);
router.delete("/deleteItem", ItemController.deleteItem);
router.get("/getItem/:id", ItemController.getItem);
//router.get("/getItemTypes", ItemController.getItem_types);
//router.post('/addItemType', ItemController.addItem_type);
//router.put('/editItemType', ItemController.editItem_type);
//router.delete('/deleteItemType', ItemController.deleteItem_type);
module.exports = router