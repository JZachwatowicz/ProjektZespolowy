const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const router = require('express').Router()

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/signup",
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  controller.signup
);

router.post("/signin", controller.signin);

router.post("/refreshtoken", controller.refreshToken);

module.exports = router