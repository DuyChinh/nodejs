var express = require('express');

var router = express.Router();
const authController = require("../controllers/auth.controller")

router.get("/login", authController.login);
const passport = require("passport");

router.post("/login",passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: true,
    successRedirect: "/",
}),
);

router.get("google/redirect", passport.authenticate("google"));

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/login", failureMessage: true, successRedirect: "/" }),
  
);

router.get("/logout", (req, res) => {
    req.logout((err) => {});
    return res.redirect("/auth/login");
});


module.exports = router;
