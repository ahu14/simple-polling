let home = require("../controllers/home");
let express = require("express");
let router = express.Router();

router.get("/", home);

module.exports = router;