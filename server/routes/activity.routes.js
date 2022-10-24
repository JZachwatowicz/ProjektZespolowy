//const { authJwt } = require("../middleware");
const ActvityController = require("../controllers/activity.controller.js");

const router = require('express').Router()


router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get("/allActivities", ActvityController.allActivities);
router.post('/addActivity', ActvityController.addActivity);
router.delete("/deleteActivity", ActvityController.deleteActivity)
module.exports = router