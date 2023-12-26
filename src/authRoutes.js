let express = require("express");

let router = express.Router();
let authController = require("./authController");


router.post("/register", authController.register);

router.post("/login", authController.login);

module.exports = router;