//const { authJwt } = require("../middleware");
const RoomController = require("../controllers/room.controller.js");

const router = require('express').Router()


router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get("/allRooms", RoomController.allRooms);
router.post('/addRoom', RoomController.addRoom);
router.put('/editRoom', RoomController.editRoom);
router.delete("/deleteRoom", RoomController.deleteRoom);
router.get("/getRoom/:id", RoomController.getRoom);
router.get("/getRoomTypes", RoomController.getRoom_types);
module.exports = router