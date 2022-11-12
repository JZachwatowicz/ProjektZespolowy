const { authJwt } = require("../middleware");
const RoomTypeController = require("../controllers/room_type.controller.js");

const router = require('express').Router()


router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get("/getRoomTypes", [authJwt.verifyToken, authJwt.isEmployee] ,RoomTypeController.getRoom_types);
router.post('/addRoomType',[authJwt.verifyToken, authJwt.isAdmin], RoomTypeController.addRoom_type);
router.put('/editRoomType',[authJwt.verifyToken, authJwt.isAdmin], RoomTypeController.editRoom_type);
router.delete('/deleteRoomType', [authJwt.verifyToken, authJwt.isAdmin], RoomTypeController.deleteRoom_type);
router.get("/getRoomType/:id", [authJwt.verifyToken, authJwt.isEmployee],RoomTypeController.getRoom_type);
module.exports = router
