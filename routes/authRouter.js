const express = require("express");
const router = express.Router();
const { AuthController } = require("../controller");
const passport = require("passport");

/** REGISTER USER */
router.post("/signin", AuthController.registerUser);

/** LOGIN USER */
router.post("/signup", AuthController.loginUser);

/** FORGOT USER */
router.post("/forgotpwd", AuthController.forgotPwdUser);

/** LOGIN WITH FACEBOOK */
router.post("/facebook", passport.authenticate("facebook"));

router.post(
  "/facebook/callback",
  passport.authenticate(
    "facebook",
    { failureRedirect: "/signin" },
    AuthController.loginViaFacebook
  )
);

/** LOGIN WITH GOOGLE */

module.exports = router;
