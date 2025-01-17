var express = require("express");
var router = express.Router();
const userController = require("../controllers/api/v1/user.controller");
const authController = require("../controllers/api/v1/auth.controller");
const authMiddleware = require("../middlewares/api/auth.middleware");

router.get("/v1/users", userController.index);
router.post("/v1/users", userController.store);

router.post("/v1/auth/login", authController.login);
router.get("/v1/auth/profile", authMiddleware,authController.profile);
router.post("/v1/auth/logout", authMiddleware,authController.logout);
router.post("/v1/auth/refresh", authController.refresh);


router.get("/v1/users/:id", userController.find);

router.put("/v1/users/:id", userController.update);
router.patch("/v1/users/:id", userController.update);




module.exports = router;