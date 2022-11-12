const { authJwt } = require("../middleware");
const RoomController = require("../controllers/room.controller.js");

const router = require('express').Router()


router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get("/allRooms", [authJwt.verifyToken, authJwt.isEmployee], RoomController.allRooms);
router.post('/addRoom',[authJwt.verifyToken, authJwt.isEmployee], RoomController.addRoom);
router.put('/editRoom', [authJwt.verifyToken, authJwt.isEmployee], RoomController.editRoom);
router.delete("/deleteRoom",[authJwt.verifyToken, authJwt.isEmployee], RoomController.deleteRoom);
router.get("/getRoom/:id",[authJwt.verifyToken, authJwt.isEmployee], RoomController.getRoom);
router.get("/getRoomTypes",[authJwt.verifyToken, authJwt.isEmployee], RoomController.getRoom_types);
module.exports = router