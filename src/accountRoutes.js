let express = require("express");

let router = express.Router();

let controller = require("./accountController");

let auths = require("./auths")

router.get("/hello", auths.checkJWT , controller.hello);

module.exports = router;
